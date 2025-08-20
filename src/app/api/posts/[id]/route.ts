import { NextRequest, NextResponse } from "next/server";
import PostgresPostRepository from "@/utils/postgres-post-repository";
import { Post } from "@/utils/post";
import { Email } from "@/utils/email";
import { Firstname } from "@/utils/firstname";
import { Lastname } from "@/utils/lastname";

const repo = new PostgresPostRepository();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { email, firstname, lastname } = await req.json();
    const post = new Post(
      new Email(email),
      new Firstname(firstname),
      new Lastname(lastname)
    );

    await repo.update(params.id, post);
    return NextResponse.json({ message: "Post updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
