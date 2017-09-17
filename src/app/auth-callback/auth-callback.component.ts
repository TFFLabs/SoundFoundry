import { Component, OnInit } from '@angular/core';
import { Session } from 'app/services/session.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const search = window.location.search;
    if (window.location.search.substring(1).indexOf('error') !== -1) {
      window.close();
    } else if (search) {
      localStorage.setItem(
        Session.STORAGE_CODE_KEY,
        search.split('&')[0].split('=')[1]
      );
    }
  }
}
