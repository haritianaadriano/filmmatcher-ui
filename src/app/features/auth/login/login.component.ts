import { Component } from '@angular/core';
import { Login } from '../../../types/login.type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  errorMessage: string = '';
  user = new Login();
  isLoading: boolean = false;

  onSubmit() {
    this.isLoading = true;
    this.authService.signin(this.user).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.isLoading = false;
        this.router.navigate(['/app/profile']);
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        this.isLoading = false;
        if (error.status === 401 || error.status === 400) {
          this.errorMessage = 'Email or password is invalid';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }
}
