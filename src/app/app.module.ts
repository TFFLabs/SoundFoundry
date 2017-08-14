import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdButtonModule } from "@angular/material";
import { MdListModule } from "@angular/material";
import { MdIconModule } from "@angular/material";
import { MdDialogModule } from "@angular/material";
import { MdTooltipModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { AuthorizationService } from "./services/authorization.service";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { PlaylistService } from "./services/playlist.service";
import { SpotifyService } from "./services/spotify.service";
import { UserService } from "./services/user.service";
import { DndModule } from "ng2-dnd";
import { LoginComponent } from "./login/login.component";
import { LandingComponent } from "./landing/landing.component";
import { MdSidenavModule } from "@angular/material";
import { MdToolbarModule } from "@angular/material";
import { MdMenuModule } from "@angular/material";
import { ErrorInterceptor } from "./interceptors/errorInterceptor";
import { Session } from "./services/session.service";
import { MdSnackBarModule } from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaylistComponent,
    AuthCallbackComponent,
    LoginComponent,
    LandingComponent
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
