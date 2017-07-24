import { Component, OnInit, Inject, ForwardRefFn, forwardRef } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authorizationService: AuthorizationService) { }

  ngOnInit() {
  }

  login(){
    const authtoken = localStorage.getItem('foundry-spotify-token');
    console.log(authtoken);
    if (!authtoken && authtoken != 'null'){
      this.authorizationService.login().subscribe(
              token => {
                  console.log(token);
                  this.router.navigate(['/playlist']);
              },
              err => console.error(err),
              () => { });
    } else{
      console.log(authtoken);
      this.router.navigate(['/playlist']);
    }
  }

}
