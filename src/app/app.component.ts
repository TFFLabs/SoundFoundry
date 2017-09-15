import { Component } from '@angular/core';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  eventsService: EventsService;

  constructor( private events: EventsService ) {
    this.eventsService = events;
  }
}
