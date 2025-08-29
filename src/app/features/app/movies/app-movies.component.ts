import { Component } from '@angular/core';
import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features-movies',
  imports: [DashboardNav, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.css',
})
export class AppMoviesComponent {
  categories = ['TRENDING', 'POPULAR', 'TOP_RATED', 'UPCOMING', 'NOW_PLAYING'];
  selectedCategory = 'TRENDING';
  isDropdownOpen = false;

  movies = [
    { title: 'Movie 1' },
    { title: 'Movie 2' },
    { title: 'Movie 3' },
    { title: 'Movie 4' },
  ];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false;

    // Ici tu peux appeler ton API pour récupérer les movies selon category
  }
}
