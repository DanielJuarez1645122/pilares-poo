import { NextRequest, NextResponse } from 'next/server';
import { UserRegister } from './user-registrer';
import UserRepository from './user-repository';

const repository = new UserRepository();
const userRegister = new UserRegister(repository);

export async function POST(req: NextRequest) {
  try {
    const { email, firstname, lastname } = await req.json();

    await userRegister.register(email, firstname, lastname);

    return NextResponse.json({
      message: "User saved successfully",
      data: { email, firstname, lastname },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save user" }, { status: 400 });
  }
}