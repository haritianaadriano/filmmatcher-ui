import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ErrorHttpComponent } from './shared/error/error.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: '**', component: ErrorHttpComponent },
];
