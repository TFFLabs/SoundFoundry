import { Component, OnInit } from "@angular/core";
import { AuthorizationService } from "../services/authorization.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {}

  login() {
    const authtoken = localStorage.getItem("foundry-spotify-token");
    if (!authtoken || authtoken == "null") {
      this.authorizationService.login().subscribe(
        token => {
          console.log(token);
          this.router.navigate(["/landing"]);
        },
        err => console.error(err),
        () => {}
      );
    } else {
      this.router.navigate(["/landing"]);
    }
  }
}
