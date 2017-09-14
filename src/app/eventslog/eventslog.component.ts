import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-eventslog',
  templateUrl: './eventslog.component.html',
  styleUrls: ['./eventslog.component.css']
})
export class EventslogComponent implements OnInit {

  eventlog: String;

  constructor(private eventsService: EventsService) {
    eventsService.subscribeToEvents(this.echoEvent);
  }

  ngOnInit() {
  }

  addEvent(text: string) {
    this.eventlog = this.eventlog + `<p>${text}`;
  }

  echoEvent = (data) => {
    console.log('Recibiendoxxxxx evento: ' + JSON.stringify(data));
  }
}
