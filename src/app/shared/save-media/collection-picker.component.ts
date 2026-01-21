import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ProfileService } from '../../features/profile/services/profile.service';
import { SaveMediaService } from '../save-media/service/save-media.service';
import { GiveSavedMedia } from '../../types/SavedMovie.type';
import { finalize, Observable, catchError, tap, of } from 'rxjs';
import { CollectionService } from '../../features/app/collections/service/collections.service';
import { SaveMediaComponent } from './save-media.component';
import { Collection, CreateCollection } from '../../types/collection.type';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { collectionsGenres } from '../../types/collections_genre';

@Component({
  selector: 'app-collection-picker',
  templateUrl: './collection-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SaveMediaComponent, CommonModule, ReactiveFormsModule],
})
export class CollectionPickerComponent implements OnInit {
  @Input({ required: true }) mediaId!: string;
  @Input({ required: true }) mediaType!: string;

  isOpen = false;
  isSaving = false;
  isLoading = true;
  showCreateModal = false;
  userId!: string;
  collections$!: Observable<Collection[]>;

  // depuis le composant de creation de collection

  genres: string[] = [];
  createForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private collectionService: CollectionService,
    private saveMediaService: SaveMediaService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.profileService.getConnectedUserId()!;
    this.isLoading = true;
    this.collections$ = this.collectionService
      .fetchUserCollections(this.userId)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.cdr.markForCheck(); // Nécessaire avec ChangeDetectionStrategy.OnPush
        }),
        catchError(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
          return of([]); // Retourner un tableau vide en cas d'erreur
        }),
      );

    //pour le nouveau modal
    this.genres = collectionsGenres;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.createForm.reset();
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
      next: () => {
        this.isLoading = true;
        this.collections$ = this.collectionService.fetchUserCollections(
          this.userId,
        );
        this.closeCreateModal();
      },
      error: (err) => {
        console.error('Failed to create collection', err);
      },
    });
  }

  saveToCollection(collectionId: string): void {
    if (this.isSaving) return;
    if (!this.userId) return;

    const payload: GiveSavedMedia = {
      tmdb_movie_id: String(this.mediaId),
      tmdb_show_id: String(this.mediaId),
      saved_on: new Date(),
    };

    this.isSaving = true;

    this.saveMediaService
      .saveMedia(this.userId, collectionId, payload, this.mediaType)
      .pipe(
        finalize(() => {
          this.isSaving = false;
          this.cdr.detectChanges();
          console.log('Final state - isSaving:', this.isSaving);
        }),
      )
      .subscribe({
        next: () => {
          this.isOpen = false;
          this.cdr.detectChanges();
          // notification de succès hanaovana debug
          alert('Saved successfully!');
        },
        error: (error) => {
          console.error('Failed to save:', error);
          // notification d'erreur hanaovana debug
          alert('Failed to save. Please try again.');
        },
      });
  }
}
