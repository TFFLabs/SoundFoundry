import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybuttonComponent } from './playbutton.component';

describe('PlaybuttonComponent', () => {
  let component: PlaybuttonComponent;
  let fixture: ComponentFixture<PlaybuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
