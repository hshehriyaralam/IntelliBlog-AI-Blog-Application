import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBlogTranslation extends Document {
  blogId: Types.ObjectId;
  lang: "en" | "ur" | "ro";
  sourceHash: string;
  title: string;
  summary: string;
  content: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogTranslationSchema = new Schema<IBlogTranslation>(
  {
    blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    lang: { type: String, enum: ["en", "ur", "ro"], required: true },
    sourceHash: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, default: "" },
    content: { type: String, required: true },
    provider: { type: String, required: true },
  },
  { collection: "blog_translations", timestamps: true }
);

blogTranslationSchema.index({ blogId: 1, lang: 1 }, { unique: true });

export const BlogTranslations =
  mongoose.models.BlogTranslation ||
  mongoose.model<IBlogTranslation>("BlogTranslation", blogTranslationSchema);
