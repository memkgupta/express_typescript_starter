import { Event } from "@/domain/interfaces/events/Event.js";
import { EventEnum } from "@/domain/interfaces/events/EventEnum.js";
import type { EventSender } from "@/domain/interfaces/events/EventSender.js";
import type { Participant } from "@/domain/quiz/Participant.js";
import { ParticipantFactory } from "@/domain/quiz/ParticipantFactory.js";
import type { Quiz } from "@/domain/quiz/Quiz.js";
import type { ParticipantRepository } from "@/domain/repositories/ParticipantRepository.js";
import type { User } from "@/domain/user/User.js";
import { NotFoundError } from "@/errors/NotFoundError.js";

export class ParticipantService
{
    constructor(private readonly participantRepo:ParticipantRepository,private readonly eventSender:EventSender){}
    joinQuiz(quiz:Quiz ,user:User){
      
        const participant = this.createParticipant(user,quiz);
        this.eventSender.send(new Event<string>(
            "",
            EventEnum.JOIN_QUIZ,
            ""
        )) // replace with the join quiz event
    }
    createParticipant(user:User , quiz:Quiz , name ?:string){
        const participant = ParticipantFactory.create(
            user , quiz , name
        )
        return this.participantRepo.save(participant);
    }
    leaveQuiz(participant:Participant){
        this.eventSender.send(
            new Event<string>(
                "",
                EventEnum.LEAVE_QUIZ,
                ""
            )
        )
    }
}