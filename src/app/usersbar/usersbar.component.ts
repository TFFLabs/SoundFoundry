import { Component, OnInit } from '@angular/core';

import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-usersbar',
  templateUrl: './usersbar.component.html',
  styleUrls: ['./usersbar.component.css']
})
export class UsersbarComponent implements OnInit {

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
  }

}
