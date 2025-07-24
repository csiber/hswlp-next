import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/db/post";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await createPost({
    userId: body.userId,
    title: body.title,
    content: body.content,
  });
  return NextResponse.json(post);
}
