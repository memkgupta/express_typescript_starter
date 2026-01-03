import type { Quiz } from "@/domain/quiz/Quiz.js";
import type { QuizRepository } from "@/domain/repositories/QuizRepository.js";

export class QuizRepositoryImpl implements QuizRepository
{
    findById(id: string): Promise<Quiz | null> {
        throw new Error("Method not implemented.");
    }
    save(quiz: Quiz): Promise<Quiz> {
        throw new Error("Method not implemented.");
    }
    
}