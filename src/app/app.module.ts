import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistService } from './playlist/playlist.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PlaylistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
