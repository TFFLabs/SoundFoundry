import { Component, OnInit } from "@angular/core";
import { Track } from "app/models/track";
import { PlaylistService } from "app/playlist/playlist.service";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.css"]
})
export class PlaylistComponent implements OnInit {
  token: String;
  tracks: Track[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.playlistService
      .getCurrentPlayList()
      .then(tracks => this.tracks = tracks);
    this.token = localStorage.getItem("foundry-spotify-token");
  }
}
