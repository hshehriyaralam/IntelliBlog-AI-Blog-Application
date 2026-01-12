import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { blogTitle, blogContent, lang = "en" } = await req.json();

    if (!blogTitle || !blogContent) {
      return NextResponse.json(
        { error: "blogTitle and blogContent are required" },
        { status: 400 }
      );
    }

    // ✅ Use the updated model name
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an assistant for a blog platform.
      Given a blog title and content, write:
      1) a concise yet information-dense summary (150–200 words),
      2) exactly 4 topic tags (single or two-word phrases).

      Return STRICT JSON only (no prose, no markdown), like:
      {"summary":"...","tags":["tag1","tag2","tag3","tag4"]}

      Language: ${lang}
      Title: ${blogTitle}
      Content: ${blogContent}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const json = tryParseJSON(text);

    if (!json || !json.summary || !Array.isArray(json.tags)) {
      return NextResponse.json(
        { error: "AI response missing summary or tags", raw: text },
        { status: 502 }
      );
    }

    const tags = Array.from(
      new Set((json.tags as string[]).map((t) => t.trim()))
    ).slice(0, 4);

    if (tags.length < 4) {
      return NextResponse.json(
        { error: "AI did not return 4 valid tags", raw: text },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { summary: json.summary.trim(), tags },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("AI Suggestion Error:", error);
    return NextResponse.json(
      { error: error.message || "AI suggestion failed" },
      { status: 500 }
    );
  }
}

function tryParseJSON(text: string) {
  try {
    const m =
      text.match(/```json\s*([\s\S]*?)```/i) ||
      text.match(/```\s*([\s\S]*?)```/);
    const payload = m ? m[1] : text;
    return JSON.parse(payload);
  } catch {
    return null;
  }
}
