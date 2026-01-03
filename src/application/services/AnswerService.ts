import type { AnswerSubmission } from "@/domain/quiz/AnswerSubmission.js";
import type { AnswerSubmissionRepository } from "@/domain/repositories/AnswerSubmissionRepository.js";
import { NotFoundError } from "@/errors/NotFoundError.js";


export class AnswerService {
  constructor(
    private readonly answerSubmissionRepo: AnswerSubmissionRepository
  ) {}


  async submitAnswer(
    submission: AnswerSubmission
  ): Promise<void> {
    const alreadySubmitted =
      await this.answerSubmissionRepo.exists(
        submission.participantId,
        submission.questionId
      );

    if (alreadySubmitted) {
      throw new Error("Answer already submitted for this question");
    }

    await this.answerSubmissionRepo.save(submission);
  }

  async getSubmission(
    participantId:string,
    questionId:string
  ) :Promise<AnswerSubmission>
  {
    const submission = await this.answerSubmissionRepo.exists(
        questionId,participantId
    );
    if(!submission)
    {
        throw new NotFoundError("No submission found")
    }
    return submission;
    
  }
}
