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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaylistComponent,
    AuthCallbackComponent,
    LoginComponent,
    LandingComponent,
    PlaybuttonComponent
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
