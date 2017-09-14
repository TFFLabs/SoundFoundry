import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventslogComponent } from './eventslog.component';

describe('EventslogComponent', () => {
  let component: EventslogComponent;
  let fixture: ComponentFixture<EventslogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventslogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventslogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
