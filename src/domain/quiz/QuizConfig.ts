export class QuizConfig {
  constructor(
    public readonly timePerQuestionInSec: number,
    public readonly pointsPerQuestion: number,
    public readonly allowNegativeMarking: boolean = false,
    public readonly negativePoints: number = 0
  ) {
    if (timePerQuestionInSec <= 0) {
      throw new Error("timePerQuestionInSec must be greater than 0");
    }

    if (pointsPerQuestion <= 0) {
      throw new Error("pointsPerQuestion must be greater than 0");
    }

    if (allowNegativeMarking && negativePoints <= 0) {
      throw new Error(
        "negativePoints must be greater than 0 when negative marking is enabled"
      );
    }
  }

  /* ---------- DOMAIN LOGIC ---------- */

  calculateScore(isCorrect: boolean): number {
    if (isCorrect) {
      return this.pointsPerQuestion;
    }

    if (this.allowNegativeMarking) {
      return -this.negativePoints;
    }

    return 0;
  }
}
