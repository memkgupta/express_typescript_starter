import type { Quiz } from "../quiz/Quiz.js";

export interface QuizRepository
{
    findById(id:string):Promise<Quiz|null>;
    save(quiz:Quiz):Promise<Quiz>
}