import { Artist } from "app/models/artist";
import { Image } from "app/models/image";
import { Serializable } from "app/models/serializable";
import { Device } from "app/models/device";

export class Devices implements Serializable<Devices> {
  devices: Device[];

  deserialize(input) {
    if (input) {
      this.devices = input.devices.map(value => new Device().deserialize(value));
    }
    return this;
  }
}