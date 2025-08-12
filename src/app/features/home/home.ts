import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  NgZone,
} from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {
  phrases: string[] = ['Story', 'Moment', 'Memories', 'Movie', 'Love'];
  currentPhrase: string = this.phrases[0];
  intervalId?: any;
  fade = false;

  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
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
