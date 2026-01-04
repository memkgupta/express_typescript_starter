import type { EventEnum } from "./EventEnum.js";

export class Event<T>
{
    constructor(
        private readonly title: string,
        private readonly eventType: EventEnum,
        private readonly data: T,
        private readonly occurredAt: Date = new Date(),
        private readonly id: string = crypto.randomUUID()
    ) {}

    /* =======================
       Getters (read-only)
       ======================= */

    getId(): string {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getEventType(): EventEnum {
        return this.eventType;
    }

    getData(): T {
        return this.data;
    }

    getOccurredAt(): Date {
        return this.occurredAt;
    }

    /* =======================
       Serialization helpers
       ======================= */

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            eventType: this.eventType,
            data: this.data,
            occurredAt: this.occurredAt.toISOString()
        };
    }
}
