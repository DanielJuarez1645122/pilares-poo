import postgres, { Sql } from "postgres";
import UserRepository from "./user-repository";
import { User } from "./user";

export default class PostgresUserRepository implements UserRepository {
  private readonly sql: Sql;

  constructor() {
    const connectionString =
      "postgresql://postgres.ugvrokvjlcfxauganbbs:EDsqbLuQ7AZ8KBem@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
    this.sql = postgres(connectionString, { ssl: "require" });
  }

  async save(user: User): Promise<void> {
    try {
      await this.sql`
        INSERT INTO users (email, firstname, lastname)
        VALUES (${user.email.getValue()}, ${user.firstname.getValue()}, ${user.lastname.getValue()});
      `;
    } catch(error) {
      console.error("ERROR REAL EN POSTGRES:", error);
      throw new Error("Failed to save user");
    }
  }
}
