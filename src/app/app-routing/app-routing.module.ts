
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PlaylistComponent } from '../playlist/playlist.component';
import { AuthCallbackComponent } from '../auth-callback/auth-callback.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'auth_callback', component: AuthCallbackComponent },
  { path: 'home',     component: HomeComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
