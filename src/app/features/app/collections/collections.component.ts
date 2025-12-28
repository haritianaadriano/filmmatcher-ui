import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import { Collection, CreateCollection } from '../../../types/collection.type';
import { collectionsGenres } from '../../../types/collections_genre';
import { ProfileService } from '../../profile/services/profile.service';
import { CollectionService } from './service/collections.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [DashboardNav, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.css',
})
export class AppCollectionsComponent implements OnInit {
  showCreateModal = false;
  isLoading = false;
  errorMessage: string | null = null;

  genres: string[] = [];
  collections: Collection[] = [];

  placeholder = 'https://via.placeholder.com/150';

  createForm: FormGroup;

  private userId!: string;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private collectionService: CollectionService,
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.genres = collectionsGenres;

    const id = this.profileService.getConnectedUserId();
    if (!id) {
      this.errorMessage = 'User not connected';
      return;
    }

    this.userId = id;
    this.loadCollections();
  }

  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.createForm.reset();
  }

  private loadCollections(): void {
    this.isLoading = true;

    this.collectionService.fetchUserCollections(this.userId).subscribe({
      next: (collections) => {
        this.collections = collections;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err?.message ?? 'Failed to load collections';
        this.isLoading = false;
      },
    });
  }

  submitCreate(): void {
    if (this.createForm.invalid) return;

    const { name, description, genre } = this.createForm.value;

    const payload: CreateCollection = {
      id: null,
      name: name.trim(),
      description: description?.trim() ?? '',
      genre,
      user_id: this.userId,
      creation_datetime: null,
      updated_at: null,
      movies_id: [],
    };

    this.collectionService.createCollection(this.userId, payload).subscribe({
      next: (createdCollection) => {
        this.collections.unshift(createdCollection[0]);
        this.closeCreateModal();
      },
      error: (err) => {
        console.error('Failed to create collection', err);
      },
    });
  }
}
