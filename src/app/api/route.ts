import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../utils/user';
import { UserRegister } from '../../utils/user-registrer';
import { Email } from '../../utils/email';
import { Firstname } from '../../utils/firstname';
import { Lastname } from '../../utils/lastname';
import InMemoryUserRepository from '../../utils/in-memory-user-repository';
import PostgresUserRepository from '../../utils/postgres-user-repository';

//const repository = new InMemoryUserRepository();
const repository = new PostgresUserRepository();
const userRegister = new UserRegister(repository);

export async function POST(req: NextRequest) {
  try {
    const { email, firstname, lastname } = await req.json();

    const user = new User(new Email(email), new Firstname(firstname), new Lastname(lastname));

    await userRegister.register(user);

    return NextResponse.json({
      message: "User saved successfully",
      data: { email, firstname, lastname },
    });
  } catch (error: any) {
    console.error("ERROR REAL:", error);
    return NextResponse.json(
      { error: "Failed to save user" },
      { status: 400 }
    );
  }
}