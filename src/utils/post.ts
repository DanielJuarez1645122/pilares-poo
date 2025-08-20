import { Email } from "./email";
import { Firstname } from "./firstname";
import { Lastname } from "./lastname";

export class Post {
  constructor(
    private email: Email,
    private firstname: Firstname,
    private lastname: Lastname
  ) {}

  getEmail(): string {
    return this.email.value;
  }

  getFirstname(): string {
    return this.firstname.value;
  }

  getLastname(): string {
    return this.lastname.value;
  }
}
