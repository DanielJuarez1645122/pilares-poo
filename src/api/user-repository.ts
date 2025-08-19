import { User } from "./user";
import { Database } from "./db-connection";

export default class UserRepository {
   private sql = Database.getConnection();

  async save(user: User): Promise<void> {
    try {
      await this.sql`
        INSERT INTO users (email, firstname, lastname)
        VALUES (${user.email.getValue()}, ${user.firstname.getValue()}, ${user.lastname.getValue()});
      `;
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Failed to save user");
    }
  }
}