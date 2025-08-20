import { Sql } from "postgres";
import { Post } from "./post";
import PostRepository from "./post-repository";
import { Database } from "./db-connection";

export default class PostgresPostRepository implements PostRepository {
  private readonly sql: Sql;

  constructor() {
    this.sql = Database.getConnection();
  }

  async save(post: Post): Promise<void> {
    await this.sql`
  INSERT INTO users (email, firstname, lastname)
  VALUES (${post.getEmail()}, ${post.getFirstname()}, ${post.getLastname()});
`;
  }

  async getAll(): Promise<Post[]> {
    const rows = await this.sql`SELECT * FROM users;`;
    return rows.map((row: any) => new Post(row.email, row.firstname, row.lastname));
  }
}
