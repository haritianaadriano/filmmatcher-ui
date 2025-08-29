import { Routes } from '@angular/router';
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
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(
        (m) => m.SignupComponent,
      ),
  },
  {
    path: 'app/profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.Profile),
  },
  {
    path: 'app/movies',
    loadComponent: () =>
      import('./features/app/movies/app-movies.component').then(
        (m) => m.AppMoviesComponent,
      ),
  },
  {
    path: 'app/search',
    loadComponent: () =>
      import('./features/app/search/search.component').then(
        (m) => m.AppSearchMovieComponent,
      ),
  },
  { path: '**', component: ErrorHttpComponent },
];
