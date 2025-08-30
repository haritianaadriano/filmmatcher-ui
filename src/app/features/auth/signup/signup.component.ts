import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { collectionsGenres } from '../../../types/collections_genre';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.css',
})
export class SignupComponent implements OnInit {
  currentStep = 1;
  isLoading = false;
  errorMessage = '';

  accountForm: FormGroup;
  preferencesForm: FormGroup;
  genres: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.accountForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );

    this.preferencesForm = this.fb.group({
      liked_genres: [[]],
      sex: ['M', Validators.required],
    });
  }
  ngOnInit(): void {
    this.genres = collectionsGenres;
  }

  nextStep() {
    if (this.currentStep < 2) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  finish() {
    this.isLoading = true;
    const payload = {
      ...this.accountForm.value,
      ...this.preferencesForm.value,
    };
    this.authService.signup(payload).subscribe({
      next: (response: any) => {
        console.log('Signup successful:', response);
        this.isLoading = false;
        this.router.navigate(['/app/movies']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.isLoading = false;
        if (error.status === 400) {
          this.errorMessage = error.error?.message || 'Invalid signup data';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
