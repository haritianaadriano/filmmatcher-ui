import { Component } from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-component',
  imports: [Navbar],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {}
