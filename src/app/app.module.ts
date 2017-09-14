import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule }  from '@angular/http';

import { MdButtonModule } from "@angular/material";
import { MdListModule } from "@angular/material";
import { MdIconModule } from "@angular/material";
import { MdDialogModule } from "@angular/material";
import { MdTooltipModule } from "@angular/material";
import { MdSidenavModule } from "@angular/material";
import { MdToolbarModule } from "@angular/material";
import { MdMenuModule } from "@angular/material";
import { MdSnackBarModule } from "@angular/material";
import { MdProgressBarModule } from "@angular/material";
import { MdProgressSpinnerModule } from "@angular/material";

import { DndModule } from "ng2-dnd";

import { AppRoutingModule } from "./app-routing/app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { LoginComponent } from "./login/login.component";
import { LandingComponent } from "./landing/landing.component";
import { PlaybuttonComponent } from "./playbutton/playbutton.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { RoomComponent } from "./room/room.component";

import { AuthorizationService } from "./services/authorization.service";
import { Session } from "./services/session.service";
import { PlaylistService } from "./services/playlist.service";
import { SpotifyService } from "./services/spotify.service";
import { UserService } from "./services/user.service";
import { StompService } from 'ng2-stomp-service';

import { ErrorInterceptor } from "./interceptors/errorInterceptor";
import { EventslogComponent } from './eventslog/eventslog.component';

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
    EventslogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdDialogModule,
    AppRoutingModule,
    MdTooltipModule,
    MdSidenavModule,
    MdToolbarModule,
    MdMenuModule,
    MdSnackBarModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    HttpModule,
    DndModule.forRoot()
  ],
  providers: [
    //Check http://devsullo.com/github/angular2-stomp-over-websocket-service/ for documentation
    StompService,
    AuthorizationService,
    {
      provide: "AuthorizationToken",
      useValue: {
        value: localStorage.getItem("angular2-spotify-token")
      }
    },
    PlaylistService,
    SpotifyService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    Session
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
