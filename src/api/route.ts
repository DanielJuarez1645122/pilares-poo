import postgres, { Sql } from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

class PostgresUserRepository {
  private readonly sql: Sql;

  constructor() {
    const connectionString =
      "postgresql://postgres.ugvrokvjlcfxauganbbs:EDsqbLuQ7AZ8KBem@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
    this.sql = postgres(connectionString, { ssl: "require" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, firstname, lastname } = await req.json();

    if (!email || !firstname || !lastname) {
      return NextResponse.json(
        { error: 'Write all items' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Write email format' },
        { status: 400 }
      );
    }

    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    if (!nameRegex.test(firstname)) {
      return NextResponse.json(
        { error: 'No less than 2 characters' },
        { status: 400 }
      );
    }
    if (!nameRegex.test(lastname)) {
      return NextResponse.json(
        { error: 'No less than 2 characters' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Data saved successfully',
      data: { email, firstname, lastname }
    });
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}
