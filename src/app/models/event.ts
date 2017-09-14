import { EventType } from './eventType';

export class Event {
    user: string;
    type: EventType;
    context: Object;

    constructor(user, type) {
        this.user = user;
        this.type = type;
        this.context = {};
    }

    setContext(key: string, value: string) {
        this.context[key] = value;
    }
}
