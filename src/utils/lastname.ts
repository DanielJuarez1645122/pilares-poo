export class Lastname {
  public readonly value: string;

  constructor(value: string) {
    if (!value || value.length < 2) {
      throw new Error("Lastname must have at least 2 characters");
    }
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!nameRegex.test(value)) {
      throw new Error("Invalid characters in lastname");
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}
