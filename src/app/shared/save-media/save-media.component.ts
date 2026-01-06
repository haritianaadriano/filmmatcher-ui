import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SaveMediaService } from './service/save-media.service';
import { ProfileService } from '../../features/profile/services/profile.service';
import { GiveSavedMedia } from '../../types/SavedMovie.type';

@Component({
  selector: 'app-save-media',
  templateUrl: './save-media.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveMediaComponent {
  @Input({ required: true }) mediaId!: number;
  @Input({ required: true }) collectionId!: string;

  isSaving = false;

  constructor(
    private saveMediaService: SaveMediaService,
    private profileService: ProfileService,
  ) {}

  save(): void {
    if (this.isSaving) return;

    const userId = this.profileService.getConnectedUserId();
    const payload: GiveSavedMedia = {
      tmdb_movie_id: this.mediaId.toString(),
      saved_on: new Date(),
    };
    this.isSaving = true;

    this.saveMediaService
      .saveMedia(userId!, this.collectionId, payload)
      .subscribe({
        next: () => {
          this.isSaving = false;
        },
        error: () => {
          this.isSaving = false;
        },
      });
  }
}
