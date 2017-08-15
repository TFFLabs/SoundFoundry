import { Component, OnInit } from "@angular/core";
import { Track } from "app/models/track";
import { PlaylistService } from "app/services/playlist.service";
import { MdDialog } from "@angular/material";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.css"]
})
export class PlaylistComponent implements OnInit {
  constructor(
    private playlistService: PlaylistService,
    public dialog: MdDialog
  ) {}

  ngOnInit() {}

  addSong($event) {
    const songUrls: string = $event.mouseEvent.dataTransfer.getData(
      "text/plain"
    );
    
    songUrls.split("\n").map(songUrl => {
      const songId: string = songUrl.substr(songUrl.lastIndexOf("/") + 1);
      if (songId) {
        this.playlistService.addTrackToTrackList(songId);
      }
    });
  }

  playStopPreview(track: Track) {
    this.playlistService.playStopPreview(track);
  }

  toogleVote(track: Track) {
    if (track.upvoted) {
      this.playlistService.downVote(track);
    } else {
      this.playlistService.upVote(track);
    }
  }

  playNextSong() {
    this.playlistService.playNextSong();
  }
}
