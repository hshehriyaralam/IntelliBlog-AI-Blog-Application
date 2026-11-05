import BlogDetailClient from "./BlogDetailClient";

export default function BlogDetailPage() {
  const translateEnabled = Boolean(
    (process.env.GEMINI_API_KEY && process.env.GEMINI_MODEL) ||
    (process.env.GROQ_API_KEY && process.env.GROQ_MODEL_AI_ASSIST) ||
    (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_MODEL_1)
  );
  return <BlogDetailClient translateEnabled={translateEnabled} />;
}
