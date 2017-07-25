import { Serializable } from "app/models/serializable";

export class Image implements Serializable<Image> {
  height: number;
  url: string;
  width: number;

  deserialize(input) {
    this.height = input.height;
    this.url = input.url;
    this.width = input.width;
    return this;
  }
}
