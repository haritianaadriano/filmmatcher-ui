import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import {
  Collection,
  CreateCollection,
  CollectionApi,
} from '../../../types/collection.type';
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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      genre: ['', Validators.required],
    });
  }

  genreColorMap: Record<string, string> = {
    COMEDY: 'text-yellow-400', // fun, light
    DRAMA: 'text-purple-400', // emotional depth
    HORROR: 'text-red-600', // fear, blood
    THRILLER: 'text-orange-500', // tension, urgency
    FANTASY: 'text-indigo-400', // magic, wonder
    ACTION: 'text-blue-500', // intensity
    ROMANCE: 'text-pink-400', // love
    MYSTERY: 'text-slate-400', // secrecy, unknown
    WESTERN: 'text-amber-500', // dust, desert
    ADVENTURE: 'text-emerald-400', // exploration
    DOCUMENTARY: 'text-teal-400', // realism
    CRIME: 'text-neutral-300', // gritty
    ANIMATION: 'text-orange-400', // playful
    MUSICAL: 'text-fuchsia-400', // expressive
    SCIENCE_FICTION: 'text-cyan-400', // technology
  };

  getGenreClass(genre: string): string {
    return this.genreColorMap[genre] ?? 'text-neutral-300';
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

  onSelectCollection(collection: Collection | CollectionApi): void {
    const collectionId = collection.id;
    this.router.navigate(['/app/collections', collectionId], {
      queryParams: {
        userId: this.userId,
        name: collection.name,
        genre: collection.genre,
        description: collection.description,
      },
    });
  }

  private loadCollections(): void {
    this.isLoading = true;

    this.collectionService.fetchUserCollections(this.userId).subscribe({
      next: (collections) => {
        this.collections = collections;
        this.isLoading = false;
        this.cdr.detectChanges();
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
