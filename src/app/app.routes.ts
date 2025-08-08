import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { Http } from './shared/http/http';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: '**', component: Http },
];
