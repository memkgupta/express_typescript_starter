import type { Host } from "./Host.js";
import { Quiz } from "./Quiz.js";
import type { QuizConfig } from "./QuizConfig.js";

export class QuizFactory {
  static createNew(
    title: string,
    host: Host,
    config: QuizConfig
  ): Quiz {
    return new Quiz(
      crypto.randomUUID(),
      title,
      host,
      config,
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
    currentQuestion: Question | null
  ): Quiz {
    return new Quiz(
      id,
      title,
      host,
      config,
      createdAt,
      currentQuestion
    );
  }
}
