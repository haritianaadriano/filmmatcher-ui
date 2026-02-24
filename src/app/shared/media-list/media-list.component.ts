import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowApi } from '../../types/tvshow.type';
import { MovieApi } from '../../types/movies-api.type';
import { MovieCard } from '../../features/app/movies/card/movie-card.component';
import { TvShowCard } from '../../features/app/tvshows/card/tvshow-card.component';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [CommonModule,MovieCard,TvShowCard],
  templateUrl: './media-list.html',
  styleUrls: ['./media-list.css'],
})
export class MediaListComponent {
  /** List of movies to display */
  @Input() movies: MovieApi[] = [];

  /** List of TV shows to display */
  @Input() shows: TvShowApi[] = [];

  /** Triggers the movie cards skeleton loader */
  @Input() isLoadingMovies = false;

  /** Triggers the TV-show cards skeleton loader */
  @Input() isLoadingShows = false;

  /** Emitted when the user clicks a movie card */
  @Output() movieSelected = new EventEmitter<MovieApi>();

  /** Emitted when the user clicks a TV-show card */
  @Output() showSelected = new EventEmitter<TvShowApi>();

  activeTab: 'movies' | 'shows' = 'movies';

  switchTab(tab: 'movies' | 'shows'): void {
    this.activeTab = tab;
  }

  onSelectMovie(movie: MovieApi): void {
    this.movieSelected.emit(movie);
  }

  onSelectShow(show: TvShowApi): void {
    this.showSelected.emit(show);
  }
}
