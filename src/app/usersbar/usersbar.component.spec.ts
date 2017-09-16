import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersbarComponent } from './usersbar.component';

describe('UsersbarComponent', () => {
  let component: UsersbarComponent;
  let fixture: ComponentFixture<UsersbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
