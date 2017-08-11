import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "app/services/playlist.service";
import { Session } from "app/services/session.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {

  constructor(private session: Session) {}

  ngOnInit() {}
}
