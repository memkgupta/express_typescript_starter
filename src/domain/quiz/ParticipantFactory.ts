import type { User } from "../user/User.js";
import { Participant } from "./Participant.js";
import type { Quiz } from "./Quiz.js";

export class ParticipantFactory
{
    static create(user:User,quiz:Quiz,name?:string):Participant
    {
        return new Participant
        (
            crypto.randomUUID(),
            quiz,
            name?name:user.name,
            user
        )
    }
}