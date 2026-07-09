import { NextRequest, NextResponse } from "next/server";
import * as posts from "@/lib/posts";

const postsModule = posts as any;
const getDynamicPosts = postsModule.getDynamicPosts ?? postsModule.getPosts ?? postsModule.default?.getDynamicPosts ?? postsModule.default?.getPosts;
const saveDynamicPost = postsModule.saveDynamicPost ?? postsModule.savePost ?? postsModule.default?.saveDynamicPost ?? postsModule.default?.savePost;
const deleteDynamicPost = postsModule.deleteDynamicPost ?? postsModule.deletePost ?? postsModule.default?.deleteDynamicPost ?? postsModule.default?.deletePost;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme123";

function checkAuth(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  return pw === ADMIN_PASSWORD;
}

export async function GET() {
  return NextResponse.json(getDynamicPosts());
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const post = await req.json();
  saveDynamicPost(post);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await req.json();
  deleteDynamicPost(slug);
  return NextResponse.json({ success: true });
}