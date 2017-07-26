import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const hash = window.location.hash;
    if (window.location.search.substring(1).indexOf("error") !== -1) {
        window.close();
    } else if (hash) {
        const token = window.location.hash.split('&')[0].split('=')[1];
        localStorage.setItem('foundry-spotify-token', token);
    }
  }

}
