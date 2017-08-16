import { Injectable } from "@angular/core";
import { Track } from "../models/track";
import { SpotifyService } from "app/services/spotify.service";
import { DomSanitizer } from "@angular/platform-browser";
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";
import { Room } from "app/models/room";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from "angularfire2/database";

@Injectable()
export class FirebaseService {
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {}

  
}
