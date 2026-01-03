export class AnswerSubmission {
  public readonly submittedAt: Date;

  constructor(
    public readonly participantId: string,
    public readonly questionId: string,
    public readonly answer: string,
    submittedAt?: Date
  ) {
    if (!participantId) {
      throw new Error("participantId is required");
    }

    if (!questionId) {
      throw new Error("questionId is required");
    }

    if (!answer || answer.trim().length === 0) {
      throw new Error("Answer cannot be empty");
    }

    this.submittedAt = submittedAt ?? new Date();
  }
}
