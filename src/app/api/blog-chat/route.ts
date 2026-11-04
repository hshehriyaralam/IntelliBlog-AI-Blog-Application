import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../lib/dbConnect";
import { Blogs } from "../../lib/Models/Blog";

export const runtime = "nodejs";
export const maxDuration = 30;

type Message = { role: "user" | "assistant"; content: string };
const usage = new Map<string, number[]>();

function json(data: unknown, status: number) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

function allowed(userId: string) {
  const now = Date.now();
  const recent = (usage.get(userId) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 30) return false;
  recent.push(now);
  usage.set(userId, recent);
  return true;
}

async function callProvider(
  name: "groq" | "gemini" | "openrouter",
  model: string,
  key: string,
  messages: Message[]
) {
  const system =
    "You answer questions only from the supplied blog context. If the answer is not explicitly supported by the blog, reply exactly: I don't know. Do not use outside knowledge. Keep answers concise and plain text.";
  if (name === "gemini") {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: messages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }],
          })),
          generationConfig: { temperature: 0.2, maxOutputTokens: 500 },
        }),
      }
    );
    if (!response.ok) throw new Error("Gemini failed");
    const data = await response.json();
    return (data?.candidates?.[0]?.content?.parts || [])
      .map((part: { text?: string }) => part.text || "")
      .join("")
      .trim();
  }

  const endpoint =
    name === "groq"
      ? "https://api.groq.com/openai/v1/chat/completions"
      : "https://openrouter.ai/api/v1/chat/completions";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, ...messages],
      temperature: 0.2,
      max_tokens: 500,
    }),
  });
  if (!response.ok) throw new Error(`${name} failed`);
  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || "";
}

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return json({ code: "UNAUTHORIZED" }, 401);
    let decoded: { id?: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id?: string };
    } catch {
      return json({ code: "UNAUTHORIZED" }, 401);
    }
    if (!decoded.id || !allowed(decoded.id)) return json({ code: "RATE_LIMITED" }, 429);

    const body = (await request.json()) as { blogId?: unknown; messages?: unknown };
    if (
      typeof body.blogId !== "string" ||
      !Array.isArray(body.messages) ||
      body.messages.length === 0 ||
      body.messages.length > 8
    ) {
      return json({ code: "INVALID_REQUEST" }, 400);
    }
    const messages = body.messages as Message[];
    if (
      messages[messages.length - 1]?.role !== "user" ||
      messages.some(
        (message) =>
          (message.role !== "user" && message.role !== "assistant") ||
          typeof message.content !== "string" ||
          !message.content.trim() ||
          message.content.length > 2_000
      )
    ) {
      return json({ code: "INVALID_REQUEST" }, 400);
    }

    await connectDB();
    const blog: any = await Blogs.findById(body.blogId)
      .select("blogTitle blogSummary blogTags blogContent userId createdAt updatedAt")
      .populate("userId", "name")
      .lean();
    if (!blog) return json({ code: "BLOG_NOT_FOUND" }, 404);

    const context = `<blog_title>${blog.blogTitle}</blog_title>
<blog_summary>${blog.blogSummary}</blog_summary>
<blog_tags>${(blog.blogTags || []).join(", ")}</blog_tags>
<blog_author>${blog.userId?.name || "Unknown"}</blog_author>
<blog_content>${blog.blogContent}</blog_content>`;
    const chatMessages: Message[] = [
      { role: "user", content: `BLOG CONTEXT:\n${context}` },
      ...messages,
    ];

    const providers = [
      { name: "groq" as const, model: process.env.GROQ_MODEL, key: process.env.GROQ_API_KEY },
      { name: "gemini" as const, model: process.env.GEMINI_MODEL, key: process.env.GEMINI_API_KEY },
      { name: "openrouter" as const, model: process.env.OPENROUTER_MODEL_1, key: process.env.OPENROUTER_API_KEY },
      { name: "openrouter" as const, model: process.env.OPENROUTER_MODEL_2, key: process.env.OPENROUTER_API_KEY },
    ];
    for (const provider of providers) {
      if (!provider.model || !provider.key) continue;
      try {
        const answer = await callProvider(provider.name, provider.model, provider.key, chatMessages);
        if (answer) return json({ answer }, 200);
      } catch {
        continue;
      }
    }
    return json({ code: "AI_CHAT_NOT_CONFIGURED" }, 503);
  } catch {
    return json({ code: "AI_CHAT_FAILED" }, 502);
  }
}
