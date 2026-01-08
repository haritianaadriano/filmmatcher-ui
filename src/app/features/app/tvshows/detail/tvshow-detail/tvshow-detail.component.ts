import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardNav } from '../../../../../shared/dashboard-nav/dashboard-nav.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TvShowDetailsApi } from '../../../../../types/tvshow.type';
import { TvshowsService } from '../../services/tvshows.service';
import { ReviewComponent } from '../../../../../shared/review/review.component';
import { CollectionPickerComponent } from '../../../../../shared/save-media/collection-picker.component';

@Component({
  selector: 'app-tvshow-detail',
  standalone: true,
  imports: [DashboardNav, CommonModule, ReviewComponent, CollectionPickerComponent],
  templateUrl: './tvshow-detail.html',
  styleUrl: './tvshow-detail.css',
})
export class TvshowDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tvshowService = inject(TvshowsService);
  private cdr = inject(ChangeDetectorRef);

  tvshow?: TvShowDetailsApi;
  isLoading = true;
  productionCountriesStr = '';
  spokenLanguagesStr = '';
  id = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.id) return;

    this.tvshowService.getTvShowsById(this.id).subscribe({
      next: (data) => {
        this.tvshow = data;
        this.isLoading = false;
        this.cdr.detectChanges();

        this.productionCountriesStr =
          data.production_countries?.map((c: any) => c.name).join(', ') ?? '';

        this.spokenLanguagesStr =
          data.spoken_languages?.map((l: any) => l.english_name).join(', ') ??
          '';
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
