import postgres, { Sql } from "postgres";

export class Database {
  private static instance: Sql;

  static getConnection(): Sql {
    if (!Database.instance) {
      const connectionString =
        "postgresql://postgres.ugvrokvjlcfxauganbbs:EDsqbLuQ7AZ8KBem@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
      Database.instance = postgres(connectionString, { ssl: "require" });
    }
    return Database.instance;
  }
}
