import { Component, OnInit } from '@angular/core';
import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Collection } from '../../../types/collection.type';
import { collectionsGenres } from '../../../types/collections_genre';

@Component({
  selector: 'app-collections',
  imports: [DashboardNav, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.css',
})
export class AppCollectionsComponent implements OnInit {
  showCreateModal = false;
  createForm: FormGroup;
  genres: string[] = [];

  placeholder = 'https://via.placeholder.com/150';
  collections: Collection[] = [
    {
      id: 'action-movies',
      title: 'Action Movies',
      posters: [
        'https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc._V1_.jpg',
        'https://m.media-amazon.com/images/M/MV5BOGIyNGRiNzgtOWQxZC00YzJmLThlZTYtYTMyMDk0YWZjMTk5XkEyXkFqcGc._V1_.jpg',
        'https://m.media-amazon.com/images/M/MV5BMzgxNzUwZTctMzliNi00MDUwLWE4YzctNjgwMDE2OWQwNzMxXkEyXkFqcGc._V1_.jpg',
      ],
      description: 'High-octane action-packed movies.',
      genre: 'Action',
      name: 'Action Movies',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      genre: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.genres = collectionsGenres;
  }

  openCreateModal() {
    this.showCreateModal = true;
  }
  closeCreateModal() {
    this.showCreateModal = false;
    this.createForm.reset();
  }

  submitCreate() {
    if (this.createForm.invalid) return;

    let { description, name, genre } = this.createForm.value;

    const collection: Collection = {
      description: description.trim(),
      name: name.trim(),
      genre, // <-- ajouté
      id: '',
      title: '',
      posters: [],
    };

    this.collections.unshift(collection);
    this.closeCreateModal();
  }
}
