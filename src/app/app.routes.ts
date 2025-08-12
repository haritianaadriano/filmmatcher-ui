import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ErrorHttpComponent } from './shared/error/error.component';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth/login', component: LoginComponent },
  { path: '**', component: ErrorHttpComponent },
];
