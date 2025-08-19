import { Email } from "./email";
import { Firstname } from "./firstname";
import { Lastname } from "./lastname";

export class User {
  constructor(
    public readonly email: Email,
    public readonly firstname: Firstname,
    public readonly lastname: Lastname
  ) {}
}
