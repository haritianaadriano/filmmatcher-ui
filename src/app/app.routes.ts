import { Routes } from '@angular/router';
import { ErrorHttpComponent } from './shared/error/error.component';
import { HomeComponent } from './features/home/components/home.component';
import { authGuard } from './core/auth-guard';

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
      import('./features/movies/movies.component').then(
        (m) => m.MoviesComponent,
      ),
  },

  // AUTH
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

  // APP (protégé par le guard)
  {
    path: 'app',
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.Profile),
      },
      {
        path: 'movies',
        loadComponent: () =>
          import('./features/app/movies/app-movies.component').then(
            (m) => m.AppMoviesComponent,
          ),
      },
      {
        path: 'movies/:id',
        loadComponent: () =>
          import('./features/app/movies/detail/movie-detail.component').then(
            (m) => m.MovieDetailComponent,
          ),
      },
      {
        path: 'tvshows',
        loadComponent: () =>
          import('./features/app/tvshows/app-tvshows.component').then(
            (m) => m.AppTvShowComponent,
          ),
      },
      {
        path: 'tvshows/:id',
        loadComponent: () =>
          import(
            './features/app/tvshows/detail/tvshow-detail/tvshow-detail.component'
          ).then((m) => m.TvshowDetailComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./features/app/search/search.component').then(
            (m) => m.AppSearchMovieComponent,
          ),
      },
      {
        path: 'collections',
        loadComponent: () =>
          import('./features/app/collections/collections.component').then(
            (m) => m.AppCollectionsComponent,
          ),
      },
      {
        path: 'collections/:id',
        loadComponent: () =>
          import(
            './features/app/collections/detail/collection-detail.component'
          ).then((m) => m.CollectionDetailComponent),
      },
    ],
  },

  // 404
  { path: '**', component: ErrorHttpComponent },
];
