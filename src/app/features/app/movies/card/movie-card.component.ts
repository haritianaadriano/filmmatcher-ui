import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor, NgClass, SlicePipe } from '@angular/common';
import { MovieApi } from '../../../../types/movies-api.type';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, SlicePipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCard {
  @Input() movie: MovieApi | null = null;
  @Output() isSelected = new EventEmitter<MovieApi>();
}
