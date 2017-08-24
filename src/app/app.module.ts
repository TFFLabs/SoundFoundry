import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
import { AuthorizationService } from "./services/authorization.service";

import { PlaylistService } from "./services/playlist.service";
import { SpotifyService } from "./services/spotify.service";
import { UserService } from "./services/user.service";
import { Session } from "./services/session.service";

import { ErrorInterceptor } from "./interceptors/errorInterceptor";

import { AngularFireModule } from "angularfire2";

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { RoomComponent } from "./room/room.component";

export const firebaseConfig = {
  apiKey: "AIzaSyB8mKIbXTAQkxbU_GYWAHB6xK0iPFLDRxw",
  authDomain: "soundfoundry-f739c.firebaseapp.com",
  databaseURL: "https://soundfoundry-f739c.firebaseio.com",
  projectId: "soundfoundry-f739c",
  storageBucket: "soundfoundry-f739c.appspot.com",
  messagingSenderId: "240027328713"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaylistComponent,
    AuthCallbackComponent,
    LoginComponent,
    LandingComponent,
    PlaybuttonComponent,
    RoomComponent
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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MdProgressSpinnerModule,
    DndModule.forRoot()
  ],
  providers: [
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
