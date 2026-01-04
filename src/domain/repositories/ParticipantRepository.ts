import type { Participant } from "../quiz/Participant.js";

export interface ParticipantRepository{
    findById(id:string):Promise<Participant|null>;
    findAll(quizId:string,page:number,offset:number):Promise<Participant[]>;
    deleteById(id:string):Promise<void>;
    save(participant:Participant):Promise<Participant>
}