import postgres, { Sql } from 'postgres';

export default class UserRepository {
  private readonly sql: Sql;

  constructor() {
    const connectionString =
      "postgresql://postgres.ugvrokvjlcfxauganbbs:EDsqbLuQ7AZ8KBem@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
    this.sql = postgres(connectionString, { ssl: "require" });
  }

  private validate(email: string, firstname: string, lastname: string): string | null {
    if (!email || !firstname || !lastname) return "Write all items";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Write email format";

    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      return "Names must have at least 2 characters";
    }

    return null;
  }

  async save(email: string, firstname: string, lastname: string): Promise<void> {
    const validationError = this.validate(email, firstname, lastname);
    if (validationError) {
      throw new Error(validationError);
    }

    try {
      await this.sql`
        INSERT INTO users (email, firstname, lastname)
        VALUES (${email}, ${firstname}, ${lastname});
      `;
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Failed to save user");
    }
  }
}