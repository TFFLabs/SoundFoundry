import { Component, OnInit } from "@angular/core";
import { UserService } from "app/services/user.service";
import { Session } from "app/services/session.service";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private session: Session,
    public afAuth: AngularFireAuth
  ) {
    this.user = this.afAuth.authState;
    this.afAuth.auth.signInAnonymously();
  }
  ngOnInit() {
    this.userService.loadUser();
    this.userService.loadUserDevices();
  }

  public logout() {
    this.afAuth.auth.signOut();
    this.session.token = null;
    localStorage.setItem("foundry-spotify-token", null);
  }
}
