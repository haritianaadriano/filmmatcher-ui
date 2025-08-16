import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ErrorHttpComponent } from './shared/error/error.component';
import { HomeComponent } from './features/home/components/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./features/movies/components/movies.component').then(
        (m) => m.MoviesComponent,
      ),
  },
  { path: 'auth/login', component: LoginComponent },
  { path: '**', component: ErrorHttpComponent },
];
