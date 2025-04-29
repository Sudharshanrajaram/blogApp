import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import BlogModel from "@/lib/models/BlogModels";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

// Connect to MongoDB
const LoadDB = async () => {
  await connectDB();
};
LoadDB();

export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json({ blog, success: true }, { status: 200 });
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs, success: true }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { msg: "Error fetching blogs", success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image");
    if (!image || !(image instanceof Blob)) {
      return NextResponse.json(
        { msg: "No valid image provided", success: false },
        { status: 400 }
      );
    }

    const category = formData.get("category");
    if (!category) {
      return NextResponse.json(
        { msg: "Category is required", success: false },
        { status: 400 }
      );
    }

    const originalFileName = image.name.split(".")[0];
    const sanitizedFileName = originalFileName.replace(/[^a-zA-Z0-9_-]/g, "_"); 
    const uniqueFileName = `${sanitizedFileName}_${Date.now()}`;

    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const mimeType = image.type;
    const base64DataURI = `data:${mimeType};base64,${base64Image}`;

    const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: JSON.stringify({
        file: base64DataURI,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        filename_override: uniqueFileName,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const cloudinaryData = await cloudinaryResponse.json();

    if (!cloudinaryData.secure_url) {
      return NextResponse.json(
        { msg: "Image upload failed", success: false, error: cloudinaryData },
        { status: 500 }
      );
    }

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category,
      author: formData.get("author"),
      image: cloudinaryData.secure_url,
      authorImg: formData.get("authorImg"),
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ msg: "Blog Saved Successfully!", success: true });
  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error", success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { msg: "Blog ID is required", success: false },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ msg: "Blog not found", success: false }, { status: 404 });
    }

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Blog Deleted", success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error", success: false, error: error.message },
      { status: 500 }
    );
  }
}
