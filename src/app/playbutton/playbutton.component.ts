import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "app/services/playlist.service";

@Component({
  selector: "app-playbutton",
  templateUrl: "./playbutton.component.html",
  styleUrls: ["./playbutton.component.css"]
})
export class PlaybuttonComponent implements OnInit {
  progress_bar_color = 'primary';
  progress_bar_mode = 'determinate';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {}

  playCurrentSong() {
    this.playlistService.playCurrentSong();
  }

  pauseCurrentSong() {
    this.playlistService.pauseCurrentSong();
  }
}
