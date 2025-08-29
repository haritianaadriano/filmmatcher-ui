import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [DashboardNav, CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.css',
})
export class AppSearchMovieComponent {
  searchQuery = '';
  movies = [
    { title: 'Movie 1' },
    { title: 'Movie 2' },
    { title: 'Movie 3' },
    // ... tes films
  ];

  filteredMovies = [...this.movies];

  onSearchChange() {
    const query = this.searchQuery.toLowerCase();
    this.filteredMovies = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(query),
    );
  }
}
