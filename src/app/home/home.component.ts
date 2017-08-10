import { Component, OnInit } from "@angular/core";
import { UserService } from "app/services/user.service";
import { SpotifyService } from "app/services/spotify.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  constructor(private userService:UserService, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.userService.getUser();
    this.userService.getUserDevices();
  }

  public logout(){
    this.spotifyService.token = null;
    localStorage.setItem("foundry-spotify-token", null);
  }
}
