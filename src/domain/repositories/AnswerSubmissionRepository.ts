import type { AnswerSubmission } from "../quiz/AnswerSubmission.js";

export interface AnswerSubmissionRepository
{
    findById(id:string):Promise<AnswerSubmission|null>;
    save(submission:AnswerSubmission):Promise<AnswerSubmission>;
    exists(questionId:string , participantId:string):Promise<AnswerSubmission|null>;
    
}