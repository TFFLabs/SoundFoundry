
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { PlaylistComponent } from '../playlist/playlist.component';
import { AuthCallbackComponent } from '../auth-callback/auth-callback.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'auth_callback', component: AuthCallbackComponent },
  { path: 'landing',     component: LandingComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
