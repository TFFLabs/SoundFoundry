import { Component, OnInit } from "@angular/core";
import { UserService } from "app/services/user.service";
import { Session } from "app/services/session.service";

import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private session: Session,
  ) {
  }
  ngOnInit() {
    this.userService.loadUser();
    this.userService.loadUserDevices();
  }

  public logout() {
    this.session.token = null;
    localStorage.setItem("foundry-spotify-token", null);
  }
}
