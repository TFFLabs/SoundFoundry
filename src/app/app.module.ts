import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AuthorizationService } from './authorization.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistService } from './playlist/playlist.service';

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
    AppRoutingModule
  ],
  providers: [AuthorizationService, {
        provide: "AuthorizationToken" ,
            useValue: {
                value: localStorage.getItem('angular2-spotify-token'),
            }
        }, PlaylistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
