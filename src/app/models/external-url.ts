import { Serializable } from "app/models/serializable";

export class ExternalUrl implements Serializable<ExternalUrl> {
  key: string;
  value: string;

  deserialize(input) {
    this.key = input.key;
    this.value = input.value;
    return this;
  }
}
