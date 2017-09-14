import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Event } from '../models/event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-eventslog',
  templateUrl: './eventslog.component.html',
  styleUrls: ['./eventslog.component.css']
})
export class EventslogComponent implements OnInit {

  eventlog: Array<[Date, string, string, string]>;

  constructor(private eventsService: EventsService) {
    eventsService.subscribeToEvents(this.printEvent);
    this.eventlog = new Array();
  }

  ngOnInit() {
  }

  printEvent = (data) => {
    this.eventlog.push([new Date(), data['user'], data['context']['trackname'], data['context']['artist']]);
  }
}
