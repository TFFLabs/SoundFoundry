import { Component, OnInit } from '@angular/core';
import { Track } from 'app/models/track';
import { PlaylistService } from 'app/services/playlist.service';
import { MatDialog } from '@angular/material';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  constructor(
    private playlistService: PlaylistService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  playStopPreview(track: Track) {
    this.playlistService.playStopPreview(track);
  }

  toogleVote(track: Track) {
    if (track.isUpvoted(this.userService.user)) {
      this.playlistService.downVote(track);
    } else {
      this.playlistService.upVote(track);
    }
  }
}
