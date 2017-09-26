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

  constructor(private spotifyService: SpotifyService, private http: Http) {
    this.loadUser();
    this.loadUserDevices();
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
    });
  }

  /**
   * Registers the user in the room (in backend).
   * @param room
   */
  public registerUserInRoom(room: Room) {
    if (this.user.id) {
      this.registerUser(room, this.user);
    } else {
      this.spotifyService.getUser().then(user => {
        this.user = new User().deserialize(user);
        this.registerUser(room, this.user);
      });
    }
  }

  private registerUser(room: Room, user: User) {
    this.http
      .post(this.server_address + '/room/' + room.name + '/user', user)
      .toPromise();
  }

  /**
   * Removes the user from the room (in backend).
   * @param room
   */
  public deregisterUserFromRoom(room: Room) {
    if (this.user.id) {
      this.http
        .delete(this.server_address + '/room/' + room.name + '/user/' + this.user.id)
        .toPromise();
    }
  }
}
