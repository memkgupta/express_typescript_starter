import  { Question } from "@/domain/quiz/Question.js";
import type { QuestionRepository } from "@/domain/repositories/QuestionRepository.js";


export class QuestionService {
  constructor(
    private readonly questionRepo: QuestionRepository
  ) {}

  /* ---------- USE CASES ---------- */

  async createQuestion(
    id: string,
    text: string,
    options: string[],
    correctAnswer: string
  ): Promise<Question> {
    const question = new Question(
      id,
      text,
      options,
      correctAnswer
    );

    await this.questionRepo.save(question);
    return question;
  }

  async getQuestionById(id: string): Promise<Question> {
    const question = await this.questionRepo.findById(id);

    if (!question) {
      throw new Error("Question not found");
    }

    return question;
  }

  async listQuestions(quizId:string): Promise<Question[]> {
    return this.questionRepo.findAll(quizId);
  }
}
