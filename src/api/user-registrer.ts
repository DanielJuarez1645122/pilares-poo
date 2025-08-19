import { User } from "./user";
import { Email } from "./email";
import { Firstname } from "./firstname";
import { Lastname } from "./lastname";
import UserRepository from "./user-repository";

export class UserRegister {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async register(email: string, firstname: string, lastname: string): Promise<void> {
    const user = new User(new Email(email), new Firstname(firstname), new Lastname(lastname));

    await this.repository.save(user);
  }
}
