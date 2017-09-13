import { EventType } from './eventType';

export class Event {
    user: string;
    type: EventType;
    context: Map<string, string>;

    constructor(user, type) {
        this.user = user;
        this.type = type;
        this.context = new Map();
    }

    setContext(key: string, value: string) {
        this.context.set(key, value);
    }
}
