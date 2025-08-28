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

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.css',
})
export class SignupComponent implements OnInit {
  currentStep = 1;

  accountForm: FormGroup;
  preferencesForm: FormGroup;
  genres: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
    const payload = {
      ...this.accountForm.value,
      ...this.preferencesForm.value,
    };
    this.authService.signup(payload).subscribe({
      next: (response: any) => {
        console.log('Signup successful:', response);
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
