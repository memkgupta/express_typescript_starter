import type { Host } from "./Host.js";
import type { Question } from "./Question.js";
import type { QuizConfig } from "./QuizConfig.js";

export class Quiz {
  constructor( public readonly id: string ,
    private readonly title: string,
    private readonly host: Host,
  
   
    private readonly config: QuizConfig,
       private readonly createdAt: Date = new Date(),
    private currentQuestion: Question | null = null
  ) {}



  start(question: Question): void {
    if (this.currentQuestion) {
      throw new Error("Quiz already started");
    }
    this.currentQuestion = question;
  }

  setNextQuestion(question: Question): void {
    this.currentQuestion = question;
  }

  getCurrentQuestion(): Question | null {
    return this.currentQuestion;
  }

  getTitle(): string {
    return this.title;
  }

  getHost(): Host {
    return this.host;
  }

  getConfig(): QuizConfig{
    return this.config;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
