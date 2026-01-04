import type { AnswerSubmission } from "@/domain/quiz/AnswerSubmission.js";
import type { Participant } from "@/domain/quiz/Participant.js";
import type { Question } from "@/domain/quiz/Question.js";
import { Quiz } from "@/domain/quiz/Quiz.js";
import { QuizFactory } from "@/domain/quiz/QuizFactory.js";
import type { QuizRepository } from "@/domain/repositories/QuizRepository.js";
import type { User } from "@/domain/user/User.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import type { HostService } from "./HostService.js";
import { Host } from "@/domain/quiz/Host.js";
import { QuizConfig } from "@/domain/quiz/QuizConfig.js";
import { QuizConfigFactory } from "@/domain/quiz/QuizConfigFactory.js";
import type { EventSender } from "@/domain/interfaces/events/EventSender.js";
import { Event } from "@/domain/interfaces/events/Event.js";
import { EventEnum } from "@/domain/interfaces/events/EventEnum.js";


export class QuizService {
  constructor(private readonly quizRepo: QuizRepository,private readonly hostService:HostService ,
    private readonly eventSender:EventSender
  ) {}

  async createQuiz(user:User , title:string):Promise<Quiz>{
     const quiz = QuizFactory.createNew(title,
       await this.hostService.createHost(new Host(
        crypto.randomUUID(),
        user.name,
        user,
    ))
,
crypto.randomUUID().toString() // todo replace with the service method for creating globally unique joining code
,
    QuizConfigFactory.createNew()
);
return quiz;
  }
  async updateQuiz(updated:Quiz)
  {
    const quiz = await this.quizRepo.findById(updated.id)
    if(!quiz) throw new NotFoundError("Quiz not found");
    await this.quizRepo.save(updated);
  }
  /* ---------- HOST ACTIONS ---------- */

  async startQuiz( quizId: string, firstQuestion: Question): Promise<void> {
    const quiz = await this.getQuizOrThrow(quizId);

    

    quiz.start(firstQuestion);

    await this.quizRepo.save(quiz);
    await this.eventSender.send(new Event<string>("",EventEnum.QUIZ_START,"")) // todo upate with correct event
  }

  async setNextQuestion(
    user: User,
    quizId: string,
    question: Question
  ): Promise<void> {
    const quiz = await this.getQuizOrThrow(quizId);

   
    quiz.setNextQuestion(question);
    await this.quizRepo.save(quiz);
    await this.eventSender.send(new Event<string>("",EventEnum.NEW_QUESTION,"")) // todo upate with correct event
  }

  /* ---------- PARTICIPANT ACTIONS ---------- */

  async submitAnswer(
    user: User,
    quizId: string,
    participant: Participant,
    submission: AnswerSubmission
  ): Promise<void> {
    const quiz = await this.getQuizOrThrow(quizId);

   

    const question = quiz.getCurrentQuestion();
    if (!question) {
      throw new NotFoundError("No active question");
    }

    const isCorrect = question.checkAnswer(submission.answer);
    const points = quiz.getConfig().calculateScore(isCorrect);

    participant.submitAnswer(
      submission.questionId,
      isCorrect,
      points
    );

    await this.quizRepo.save(quiz);
  }

  /* ---------- READ MODELS ---------- */

  async getCurrentQuestion(quizId: string): Promise<Question | null> {
    const quiz = await this.getQuizOrThrow(quizId);
    return quiz.getCurrentQuestion();
  }

  /* ---------- PRIVATE HELPERS ---------- */

  private async getQuizOrThrow(id: string): Promise<Quiz> {
    const quiz = await this.quizRepo.findById(id);
    if (!quiz) {
      throw new NotFoundError("Quiz not found");
    }
    return quiz;
  }
}
