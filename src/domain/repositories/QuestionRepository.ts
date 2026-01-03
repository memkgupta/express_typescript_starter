import type { Question } from "../quiz/Question.js";

export interface QuestionRepository{
    findById(id:string):Promise<Question|null>;
    save(question:Question):Promise<Question>;
    findAll(quizId:string):Promise<Question[]>;
}