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
import { finalize, Observable } from 'rxjs';
import { CollectionService } from '../../features/app/collections/service/collections.service';
import { SaveMediaComponent } from './save-media.component';
import { Collection } from '../../types/collection.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-picker',
  templateUrl: './collection-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SaveMediaComponent, CommonModule],
})
export class CollectionPickerComponent implements OnInit {
  @Input({ required: true }) mediaId!: string;
  @Input({ required: true }) mediaType!: string;

  isOpen = false;
  isSaving = false;
  userId!: string;
  collections$!: Observable<Collection[]>;

  constructor(
    private profileService: ProfileService,
    private collectionService: CollectionService,
    private saveMediaService: SaveMediaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userId = this.profileService.getConnectedUserId()!;
    this.collections$ = this.collectionService.fetchUserCollections(
      this.userId,
    );
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  saveToCollection(collectionId: string): void {
    if (this.isSaving) return;
    if (!this.userId) return;

    const payload: GiveSavedMedia = {
      tmdb_movie_id: String(this.mediaId),
      tmdb_tv_show_id: String(this.mediaId),
      saved_on: new Date(),
    };

    this.isSaving = true;

    this.saveMediaService
      .saveMedia(this.userId, collectionId, payload, this.mediaType)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe(() => {
        this.isOpen = false;
        this.cdr.detectChanges();
      });
  }
}
