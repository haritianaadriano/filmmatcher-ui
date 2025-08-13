import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ErrorHttpComponent } from './shared/error/error.component';
import { HomeComponent } from './features/home/components/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: '**', component: ErrorHttpComponent },
];
