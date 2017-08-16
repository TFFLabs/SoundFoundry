import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "app/services/playlist.service";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"]
})
export class RoomComponent implements OnInit {
  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {}
}
