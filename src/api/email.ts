export class Email {
  private readonly value: string;

  constructor(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error("Invalid email");
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}