import { Event } from "./Event.js";

export interface EventSender {
    send<T>(event:Event<T>):Promise<void>
}