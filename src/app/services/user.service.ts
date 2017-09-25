import { Injectable } from '@angular/core';

import { Devices } from 'app/models/devices';
import { SpotifyService } from 'app/services/spotify.service';
import { User } from 'app/models/user';
import { Room } from 'app/models/room';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
  devices: Devices = new Devices();
  user: User = new User();
  private server_address = environment.sf_server_address;

  constructor(private spotifyService: SpotifyService,  private http: Http) {
  }

  public loadUserDevices() {
    this.spotifyService.getUserDevices().then(devices => {
      this.devices = new Devices().deserialize(devices);
    });
  }

  /**
   * Loads user information from spotify.
   */
  public loadUser() {
    this.spotifyService.getUser().then(user => {
      this.user = new User().deserialize(user);
    })
  }

  /**
   * Registers the user in the room (in backend).
   * @param room
   */
  public registerUserInRoom(room: Room) {
    this.http
      .post(
      this.server_address +
      '/room/' +
      room.name +
      '/user',
      this.user
      )
      .toPromise();
  }
}
