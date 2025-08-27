import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { collectionsGenres } from '../../../types/collections_genre';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  currentStep = 1;

  accountForm: FormGroup;
  preferencesForm: FormGroup;
  genres = collectionsGenres;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.preferencesForm = this.fb.group({
      liked_genre: [[]],
    });
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
    console.log('Final data:', payload);
  }
}
