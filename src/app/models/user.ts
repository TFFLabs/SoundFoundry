import { Image } from "app/models/image";
import { Serializable } from "app/models/serializable";

export class User implements Serializable<User> {
  country: string;
  display_name: string;
  email: string;
  id: string;
  images: Image[];
  thumbnail_small: Image;

  deserialize(input) {
    if (input) {
      this.country = input.country;
      this.display_name = input.display_name;
      this.email = input.email;
      this.images = input.images.map(value => new Image().deserialize(value));
      this.id = input.id;
      this.thumbnail_small = this.getSmallestImage();
    }
    return this;
  }

  private getSmallestImage(): Image {
    if(this.images){
        return this.images.sort((image1, image2) => image1.width - image2.width)[0];
    }
  }
}
