import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardNav } from '../../../../../shared/dashboard-nav/dashboard-nav.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TvShowDetailsApi } from '../../../../../types/tvshow.type';
import { TvshowsService } from '../../services/tvshows.service';

@Component({
  selector: 'app-tvshow-detail',
  standalone: true,
  imports: [DashboardNav, CommonModule],
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.tvshowService.getTvShowsById(id).subscribe({
      next: (data) => {
        this.tvshow = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
      },
    });

    if (this.tvshow) {
      this.productionCountriesStr =
        this.tvshow.production_countries?.map((c: any) => c.name).join(', ') ??
        '';

      this.spokenLanguagesStr =
        this.tvshow.spoken_languages
          ?.map((l: any) => l.english_name)
          .join(', ') ?? '';
    }
  }
}
