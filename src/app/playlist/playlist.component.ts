import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  token:String;

  constructor() { }

  ngOnInit() {
    this.token = localStorage.getItem('foundry-spotify-token');
  }

}
