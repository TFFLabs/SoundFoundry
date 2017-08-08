import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdButtonModule } from "@angular/material";
import { MdListModule } from "@angular/material";
import { MdIconModule } from "@angular/material";
import { MdDialogModule } from "@angular/material";
import { MdTooltipModule } from "@angular/material";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { AuthorizationService } from "./authorization.service";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { PlaylistService } from "./playlist/playlist.service";
import { SpotifyService } from "./services/spotify.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaylistComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdDialogModule,
    AppRoutingModule,
    MdTooltipModule,
    HttpModule
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
    SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
