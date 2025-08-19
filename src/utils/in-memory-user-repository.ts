import UserRepository from "./user-repository";
import { User } from "./user";

export default class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  constructor() {
    this.users = [];
  }

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
