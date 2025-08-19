import { User } from "./user";
import UserRepository from "./user-repository";

export class UserRegister {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async register(user: User): Promise<void> {
    await this.repository.save(user);
  }
}
