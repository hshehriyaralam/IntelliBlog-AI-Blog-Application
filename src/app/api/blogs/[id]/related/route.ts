import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect";
import { Blogs } from "../../../../lib/Models/Blog";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const current = (await Blogs.findById(id).select("blogTags userId").lean()) as any;
    if (!current) return NextResponse.json({ blogs: [] });

    const tags: string[] = Array.isArray(current.blogTags) ? current.blogTags : [];
    const candidates = (await Blogs.find({
      _id: { $ne: id },
    })
      .select("blogTitle blogSummary blogTags blogImage userId createdAt")
      .populate("userId", "name profilePic")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean()) as any[];

    const currentTagSet = new Set(tags.map((tag) => tag.toLowerCase()));
    const related = candidates
      .map((blog: any) => ({
        ...blog,
        sharedTags: (blog.blogTags || []).filter((tag: string) =>
          currentTagSet.has(tag.toLowerCase())
        ).length,
        sameAuthor: String(blog.userId?._id) === String(current.userId) ? 1 : 0,
      }))
      .sort(
        (a: any, b: any) =>
          b.sharedTags - a.sharedTags ||
          b.sameAuthor - a.sameAuthor ||
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);

    return NextResponse.json(
      { blogs: related },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json({ blogs: [] }, { status: 500 });
  }
}
