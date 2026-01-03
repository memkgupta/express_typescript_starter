import type { User } from "../user/User.js";

export class Participant {
  private score: number = 0;
  private answeredQuestionIds = new Set<string>();

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly user: User
  ) {}


  submitAnswer(
    questionId: string,
    isCorrect: boolean,
    points: number = 1
  ): void {
    if (this.answeredQuestionIds.has(questionId)) {
      throw new Error("Participant has already answered this question");
    }

    this.answeredQuestionIds.add(questionId);

    if (isCorrect) {
      this.score += points;
    }
  }

  getScore(): number {
    return this.score;
  }

  hasAnswered(questionId: string): boolean {
    return this.answeredQuestionIds.has(questionId);
  }
}
