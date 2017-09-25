import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { AuthorizationService } from 'app/services/authorization.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authorization: AuthorizationService,
  ) {
  }

  ngOnInit() {
    this.userService.loadUser();
  }

  public logout() {
    this.authorization.logout();
  }
}
