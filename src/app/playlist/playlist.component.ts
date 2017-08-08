import { Component, OnInit } from "@angular/core";
import { Track } from "app/models/track";
import { PlaylistService } from "app/playlist/playlist.service";
import { MdDialog } from "@angular/material";
import { SpotifyService} from './../services/spotify.service';

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.css"]
})
export class PlaylistComponent implements OnInit {
  token: String;
  tracks: Track[];

  constructor(private playlistService: PlaylistService, public dialog: MdDialog, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.playlistService
      .getCurrentPlayList()
      .then(tracks => this.tracks = tracks);
    this.token = localStorage.getItem("foundry-spotify-token");
  }

  addSong($event){
    console.log("works!")
  }

  playTrack(){
    console.log('play');
    this.spotifyService.playTrack("0lw68yx3MhKflWFqCsGkIs");
  }
}
