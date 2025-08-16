import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component',
  imports: [Navbar, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  searchQuery = '';

  movies = [
    {
      title: 'Inception',
      description:
        'A skilled thief is given a chance at redemption if he can successfully perform inception.',
      image: 'https://via.placeholder.com/120x160',
    },
    {
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space.',
      image: 'https://via.placeholder.com/120x160',
    },
    {
      title: 'The Matrix',
      description:
        'A computer hacker learns about the true nature of his reality.',
      image: 'https://via.placeholder.com/120x160',
    },
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
    });
  }

  get filteredMovies() {
    if (!this.searchQuery) return this.movies;
    return this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }
}
