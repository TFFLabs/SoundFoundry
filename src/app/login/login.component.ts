import { Component, OnInit } from "@angular/core";
import { AuthorizationService } from "../services/authorization.service";
import { Router } from "@angular/router";
import { Session } from "app/services/session.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private session: Session
  ) {}

  ngOnInit() {}

  login() {
    
    if (this.isTokenNeeded()) {
      this.startLoginFlow();
    } else {
      this.navigateToLandingPage();
    }
  }

  private isTokenNeeded(){
    const authtoken = this.session.token;
    return !authtoken || authtoken == "null";
  }

  private startLoginFlow(){
    this.authorizationService.login().subscribe(
      token => {
        this.navigateToLandingPage();
      },
      err => console.error(err),
      () => {}
    );
  }

  private navigateToLandingPage(){
    this.router.navigate(["/landing"]);
  }
}
