import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router) {}

  searchValue: string = '';
  menuOpen = false;
  @Output() searchEvent = new EventEmitter<string>();

  onSearch() {
    if (this.searchValue.trim()) {
      this.router.navigate(['/movies'], {
        queryParams: { search: this.searchValue },
      });
    } else {
      this.router.navigate(['/movies']);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
