export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    
  ) {
    if (!id) {
      throw new Error("User id is required");
    }

    if (!name || name.trim().length === 0) {
      throw new Error("User name is required");
    }

    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email address");
    }
  }

  canHostQuiz(): boolean {
    return true;
  }

  canParticipate(): boolean {
    return true;
  }


  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
