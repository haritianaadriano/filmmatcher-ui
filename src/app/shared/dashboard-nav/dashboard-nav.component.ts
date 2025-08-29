import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  imports: [CommonModule],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.css',
})
export class DashboardNav {
  isOpen = true;

  toggleNav() {
    this.isOpen = !this.isOpen;
  }
}
