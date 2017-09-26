import { Component, OnInit, HostListener } from '@angular/core';
import { PlaylistService } from 'app/services/playlist.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  constructor(private playlistService: PlaylistService,
    private userService: UserService) {}

  ngOnInit() {}

  addSong($event) {
    const songUrls: string = $event.mouseEvent.dataTransfer.getData(
      'text/plain'
    );

    songUrls.split('\n').map(songUrl => {
      const songId: string = songUrl.substr(songUrl.lastIndexOf('/') + 1);
      if (songId) {
        this.playlistService.addTrackToTrackList(songId);
      }
    });
  }

  @HostListener('window:unload', [ '$event' ])
  beforeUnloadHander(event) {
    this.userService.deregisterUserFromRoom(this.playlistService.room);
  }
}
