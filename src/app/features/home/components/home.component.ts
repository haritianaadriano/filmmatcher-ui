import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  NgZone,
} from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  imports: [Navbar, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  moviesTemplate: any[] = [
    {
      title: 'Mecredi',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BZGQxYWFlNzgtODZjMS00YmM5LWEzZWMtOGVmODMzYjIyODZiXkEyXkFqcGc@._V1_.jpg',
      rate: 8,
    },
    {
      title: 'Happy Gilmore 2',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BYTQyNTRmYjItMDBjYi00YWNhLWEwMmQtNzJhODNiNjEzOWJlXkEyXkFqcGc@._V1_.jpg',
      rate: 6.3,
    },
    {
      title: 'Dexter: Resurrection',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMzgxNzUwZTctMzliNi00MDUwLWE4YzctNjgwMDE2OWQwNzMxXkEyXkFqcGc@._V1_.jpg',
      rate: 7.5,
    },
  ];
  phrases: string[] = ['Story', 'Moment', 'Memories', 'Movie', 'Love'];
  cards = [];
  currentPhrase: string = this.phrases[0];
  intervalId?: any;
  fade = false;

  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private homeService: HomeService,
  ) {}

  getColor(phrase: string): string {
    if (phrase === 'Love' || phrase === 'Memories') {
      return '#FF007A'; // pink
    }
    if (phrase === 'Moment' || phrase === 'Movie') {
      return '#007BFF'; // blue
    }
    return '#FFD600'; // yellow as default
  }

  ngOnInit(): void {
    let index = 0;

    // Correct subscription
    this.homeService.getImageUrls().subscribe({
      next: (data: any) => {
        this.cards = data;
        this.cd.detectChanges(); // forcer la détection des changements
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      },
    });

    // Exécuter setInterval hors de la zone Angular
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        // Revenir dans la zone Angular pour déclencher la détection
        this.ngZone.run(() => {
          this.fade = true;
          setTimeout(() => {
            index = (index + 1) % this.phrases.length;
            this.currentPhrase = this.phrases[index];
            this.fade = false;
            this.cd.detectChanges(); // forcer la détection
          }, 500);
        });
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
