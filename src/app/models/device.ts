import { TrackLink } from "app/models/track-link";
import { Serializable } from "app/models/serializable";

export class Device implements Serializable<Device> {
  id: string;
  is_active: boolean;
  is_restricted: boolean;
  name: string;
  type: string; //such as "Computer", "Smartphone" or "Speaker".
  volume_percent: number;

  deserialize(input) {
    if (input) {
      this.id = input.id;
      this.is_active = input.is_active;
      this.is_restricted = input.is_restricted;
      this.name = input.name;
      this.type = input.type;
      this.volume_percent = input.volume_percent;
    }
    return this;
  }
  public getSelectedStatusIcon(): string {
    let statusIconName = "check_box_outline_blank";
    if (this.is_restricted) {
      statusIconName = "indeterminate_check_box";
    } else {
      if (this.is_active) {
        statusIconName = "check_box";
      }
    }
    return statusIconName;
  }
}
