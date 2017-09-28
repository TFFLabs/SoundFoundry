import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { MatButtonModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';


import { DndModule } from 'ng2-dnd';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { PlaybuttonComponent } from './playbutton/playbutton.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RoomComponent } from './room/room.component';
import { EventslogComponent } from './eventslog/eventslog.component';

import { AuthorizationService } from './services/authorization.service';
import { Session } from './services/session.service';
import { PlaylistService } from './services/playlist.service';
import { SpotifyService } from './services/spotify.service';
import { UserService } from './services/user.service';
import { StompService } from 'ng2-stomp-service';
import { EventsService } from './services/events.service';

import { CookieService } from 'ngx-cookie-service';

import { ErrorInterceptor } from './interceptors/errorInterceptor';
import { UsersbarComponent } from './usersbar/usersbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaylistComponent,
    AuthCallbackComponent,
    LoginComponent,
    LandingComponent,
    PlaybuttonComponent,
    RoomComponent,
    EventslogComponent,
    UsersbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    AppRoutingModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    HttpModule,
    DndModule.forRoot()
  ],
  providers: [
    // Check http://devsullo.com/github/angular2-stomp-over-websocket-service/ for documentation
    StompService,
    AuthorizationService,
    PlaylistService,
    SpotifyService,
    UserService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    EventsService,
    Session
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
