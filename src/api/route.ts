import { NextRequest, NextResponse } from 'next/server';
import UserRepository from './user-repository';

const repo = new UserRepository();

export async function POST(req: NextRequest) {
  try {
    const { email, firstname, lastname } = await req.json();
    await repo.save(email, firstname, lastname);

    return NextResponse.json({
      message: "User saved successfully",
      data: { email, firstname, lastname },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save user" }, { status: 400 });
  }
}