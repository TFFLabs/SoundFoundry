import { EventType } from './eventType';

export class Event {
    user: string;
    type: EventType;
    context: Map<string, string>;

    constructor(user, type) {
        this.user = user;
        this.type = type;
        this.context = new Map<string, string>([['artist', 'SoundGarden']]);
    }

    setContext(key: string, value: string) {
        this.context.set(key, value);
        console.log('context ' + key + value + JSON.stringify(this.context));
    }
}
