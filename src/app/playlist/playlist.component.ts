import { Component, OnInit } from "@angular/core";
import { Track } from "app/models/track";
import { PlaylistService } from "app/playlist/playlist.service";
import { MdDialog } from "@angular/material";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.css"]
})
export class PlaylistComponent implements OnInit {
  token: String;

  constructor(
    private playlistService: PlaylistService,
    public dialog: MdDialog
  ) {}

  ngOnInit() {
    this.playlistService.getCurrentPlayList();
    this.token = localStorage.getItem("foundry-spotify-token");
  }

  addSong($event) {
    const songUrl: string = $event.mouseEvent.dataTransfer.getData(
      "text/plain"
    );
    const songId: string = songUrl.substr(songUrl.lastIndexOf("/") + 1);
    if (songId) {
      this.playlistService.addTrackToTrackList(songId, this.token);
    }
  }
}
