import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  phrases: string[] = ['Story', 'Moment', 'Movie', 'Love'];
  currentPhrase: string = this.phrases[0];
  intervalId?: any;
  fade = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    let index = 0;
    this.intervalId = setInterval(() => {
      this.fade = true;
      setTimeout(() => {
        index = (index + 1) % this.phrases.length;
        this.currentPhrase = this.phrases[index];
        this.fade = false;
        this.cd.detectChanges();
      }, 500);
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
