import postgres, { Sql } from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql: Sql = postgres(
  "postgresql://postgres.ugvrokvjlcfxauganbbs:EDsqbLuQ7AZ8KBem@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
  { ssl: "require" }
);

export async function POST(req: NextRequest) {
  try {
    const { email, firstname, lastname } = await req.json();

    const validationError = validateFields(email, firstname, lastname);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await saveUser(email, firstname, lastname);

    return NextResponse.json({
      message: "User saved successfully",
      data: { email, firstname, lastname },
    });
  } catch (error) {
    console.error("Error in POST /users:", error);
    return NextResponse.json(
      { error: "Failed to save user" },
      { status: 500 }
    );
  }
}

async function saveUser(email: string, firstname: string, lastname: string) {
  try {
    await sql`
      INSERT INTO users (email, firstname, lastname)
      VALUES (${email}, ${firstname}, ${lastname});
    `;
  } catch (error) {
    console.error("Error saving user:", error);
    throw new Error("Failed to save user");
  }
}

function validateFields(email: string, firstname: string, lastname: string) {
  if (!email || !firstname || !lastname) {
    return "Write all items";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Write email format";
  }

  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
  if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
    return "Names must have at least 2 characters";
  }

  return null;
}