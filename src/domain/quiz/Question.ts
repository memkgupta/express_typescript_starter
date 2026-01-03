export class Question {
  private readonly correctAnswer: string;
  private readonly options: string[];

  constructor(
    public readonly id: string,
    public readonly text: string,
    options: string[],
    correctAnswer: string
  ) {
    if (options.length < 2) {
      throw new Error("A question must have at least 2 options");
    }

    if (!options.includes(correctAnswer)) {
      throw new Error("Correct answer must be one of the options");
    }

    this.options = [...options];
    this.correctAnswer = correctAnswer;
  }



  checkAnswer(answer: string): boolean {
    return answer === this.correctAnswer;
  }

  getOptions(): readonly string[] {
    return this.options;
  }
}
