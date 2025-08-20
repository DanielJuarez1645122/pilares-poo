import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/utils/post";
import PostRegistrar from "@/utils/post-registrer";
import InMemoryPostRepository from "@/utils/in-memory-post-repository";
import PostgresPostRepository from "@/utils/postgres-post-repository";
import { Email } from "@/utils/email";
import { Firstname } from "@/utils/firstname";
import { Lastname } from "@/utils/lastname";

const repo = new PostgresPostRepository();
//const repo = new InMemoryPostRepository();
const registrar = new PostRegistrar(repo);

export async function POST(req: NextRequest) {
  try {
    const { email, firstname, lastname } = await req.json();
    const post = new Post(
      new Email(email),
      new Firstname(firstname),
      new Lastname(lastname)
);
    await registrar.register(post);

    return NextResponse.json({ message: "Post created successfully" });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const posts = await repo.getAll();
    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
