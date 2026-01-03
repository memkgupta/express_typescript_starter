import type { User } from "../user/User.js";

export class Host {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly user:User
  ) {}

  canStartQuiz(): boolean {
    return true;
  }

  canEndQuiz(): boolean {
    return true;
  }
}
