import { Component } from '@angular/core';
import { Login } from '../../../types/login.type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user = new Login();

  onSubmit() {
    if (this.user.email && this.user.password) {
      console.log('Email:', this.user.email);
      console.log('Mot de passe:', this.user.password);
    }
  }
}
