import { NextRequest } from "next/server";
import cloudinary from '../../lib/Cloudinary'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { file } = body;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {  
        status: 400,
      });
    }

    // Upload to Cloudinary (base64 supported with data URI)
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "blog_image",
      use_filename: true,
      unique_filename: true,
      resource_type: "image",
    });

    return new Response(JSON.stringify({ url: uploadResponse.secure_url }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
