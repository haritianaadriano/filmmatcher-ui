import { Component } from '@angular/core';
import { Login } from '../../../types/login.type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/services.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  user = new Login();

  onSubmit() {
    this.authService.signin(this.user).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
      },
      error: (error: any) => {
        console.error('Login failed:', error);
      },
    });
  }
}
