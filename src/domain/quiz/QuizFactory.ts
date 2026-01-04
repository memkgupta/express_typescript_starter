import type { Host } from "./Host.js";
import type { Question } from "./Question.js";
import { Quiz } from "./Quiz.js";
import type { QuizConfig } from "./QuizConfig.js";

export class QuizFactory {
  static createNew(
    title: string,
    host: Host,
    code:string,
    config: QuizConfig
  ): Quiz {
    return new Quiz(
      crypto.randomUUID(),
      title,
      host,
      config,
      code,
      new Date(),
      null
    );
  }

  static rehydrate(
    id: string,
    title: string,
    host: Host,
    config: QuizConfig,
    createdAt: Date,
    code:string,
    currentQuestion: Question | null
  ): Quiz {
    return new Quiz(
      id,
      title,
      host,
      config,
      code,
      createdAt,
      currentQuestion
    );
  }
}
