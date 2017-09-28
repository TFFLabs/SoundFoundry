import { Image } from 'app/models/image';
import { Serializable } from 'app/models/serializable';

export class User implements Serializable<User> {
  country: string;
  display_name: string;
  email: string;
  id: string;
  images: Image[];
  thumbnail_small: Image;

  deserialize(input) {
    if (input) {
      this.id = input.id;
      this.country = input.country;
      this.display_name = input.display_name ? input.display_name : this.id;
      this.email = input.email;
      this.images = input.images.map(value => new Image().deserialize(value));
      if (!this.images || this.images.length === 0) {
        const img = new Image();
        img.url = '../../assets/img/boy-with-headphones.png';
        this.images.push(img);
      }
      this.thumbnail_small = this.getSmallestImage();
    }
    return this;
  }

  public getSmallestImage(): Image {
    if (this.images && this.images.length > 0) {
      return this.images.sort(
        (image1, image2) => image1.width - image2.width
      )[0];
    }
  }

  // gets a color based on the user display name, the linting error here is a bitwise one.
  public getVoterColor(): string {
    let hash = 0;
    for (let i = 0; i < this.display_name.length; i++) {
      hash = this.display_name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
}
