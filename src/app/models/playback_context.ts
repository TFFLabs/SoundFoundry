import { Serializable } from 'app/models/serializable';
import { Device } from 'app/models/device';
import { Track } from 'app/models/track';

export class PlaybackContext implements Serializable<PlaybackContext> {
    device: Device;
    progress_ms: number;
    is_playing: boolean;
    item: Track;

    deserialize(input): PlaybackContext {
        if (input) {
            this.device = new Device().deserialize(input.device);
            this.progress_ms = input.progress_ms;
            this.is_playing = input.is_playing;
            this.item = new Track().deserialize(input.item);
        }
        return this;
    }
}
