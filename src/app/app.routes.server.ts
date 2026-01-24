import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'app/movies/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'app/tvshows/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'app/collections/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
