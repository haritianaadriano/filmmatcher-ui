import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionDetailComponent } from './collection-detail.component';
import { CollectionService } from '../service/collections.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MovieApi } from '../../../../types/movies-api.type';
import { TvShowApi } from '../../../../types/tvshow.type';

describe('CollectionDetailComponent', () => {
  let component: CollectionDetailComponent;
  let fixture: ComponentFixture<CollectionDetailComponent>;
  let collectionService: jasmine.SpyObj<CollectionService>;
  let activatedRoute: any;

  const mockMovies: MovieApi[] = [
    {
      id: '1',
      originalTitle: 'Test Movie',
      primaryImage: {
        url: 'https://example.com/image.jpg',
        width: 100,
        height: 150,
        type: 'poster',
      },
      plot: 'Test plot',
      rating: { aggregateRating: 8.5 },
      releaseDate: { year: 2023, month: 1, day: 1 },
      productionYear: 2023,
    } as MovieApi,
  ];

  const mockTvShows: TvShowApi[] = [
    {
      media_source: 'tmdb',
      id: '1',
      original_name: 'Test Show',
      name: 'Test Show',
      genres: ['Drama', 'Thriller'],
      first_air_date: '2023-01-01',
      description: 'Test description',
      popularity: 8.5,
      poster_path: 'https://example.com/poster.jpg',
      backdrop_path: 'https://example.com/backdrop.jpg',
      meta_critic: { score: 75, review_count: 10 },
      imdb_token: 'tt1234567',
    },
  ];

  beforeEach(async () => {
    const collectionServiceSpy = jasmine.createSpyObj('CollectionService', [
      'fetchCollectionMedias',
    ]);

    activatedRoute = {
      params: of({ id: 'col-123', userId: 'user-456' }),
    };

    await TestBed.configureTestingModule({
      imports: [CollectionDetailComponent],
      providers: [
        { provide: CollectionService, useValue: collectionServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    collectionService = TestBed.inject(
      CollectionService,
    ) as jasmine.SpyObj<CollectionService>;
    fixture = TestBed.createComponent(CollectionDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load collection medias on init', () => {
      collectionService.fetchCollectionMedias.and.returnValue(of(mockMovies));

      fixture.detectChanges();

      expect(collectionService.fetchCollectionMedias).toHaveBeenCalled();
    });

    it('should set collectionId and userId from route params', () => {
      collectionService.fetchCollectionMedias.and.returnValue(of(mockMovies));

      fixture.detectChanges();

      expect(component['collectionId']).toBe('col-123');
      expect(component['userId']).toBe('user-456');
    });
  });

  describe('switchTab', () => {
    it('should change activeTab to movies', () => {
      component.activeTab = 'shows';
      component.switchTab('movies');

      expect(component.activeTab).toBe('movies');
    });

    it('should change activeTab to shows', () => {
      component.activeTab = 'movies';
      component.switchTab('shows');

      expect(component.activeTab).toBe('shows');
    });
  });

  describe('loadMovies', () => {
    it('should load movies successfully', () => {
      collectionService.fetchCollectionMedias.and.returnValue(of(mockMovies));

      component['loadMovies']();

      expect(component.movies).toEqual(mockMovies);
      expect(component.isLoadingMovies).toBe(false);
    });

    it('should handle movie loading error', () => {
      const error = new Error('Failed to load movies');
      collectionService.fetchCollectionMedias.and.returnValue(
        throwError(() => error),
      );

      component['loadMovies']();

      expect(component.errorMessage).toContain(
        'Failed to load collection movies',
      );
      expect(component.isLoadingMovies).toBe(false);
    });

    it('should set isLoadingMovies to true during loading', () => {
      collectionService.fetchCollectionMedias.and.returnValue(of(mockMovies));

      component.isLoadingMovies = false;
      component['loadMovies']();

      expect(component.isLoadingMovies).toBe(false);
    });
  });

  describe('loadShows', () => {
    it('should load TV shows successfully', () => {
      collectionService.fetchCollectionMedias.and.returnValue(of(mockTvShows));

      component['loadShows']();

      expect(component.tvshows).toEqual(mockTvShows);
      expect(component.isLoadingShows).toBe(false);
    });

    it('should handle TV show loading error', () => {
      const error = new Error('Failed to load shows');
      collectionService.fetchCollectionMedias.and.returnValue(
        throwError(() => error),
      );

      component['loadShows']();

      expect(component.errorMessage).toContain(
        'Failed to load collection shows',
      );
      expect(component.isLoadingShows).toBe(false);
    });
  });

  describe('loadMedias', () => {
    it('should load both movies and shows', () => {
      collectionService.fetchCollectionMedias.and.returnValue(of(mockMovies));

      component['loadMedias']();

      expect(collectionService.fetchCollectionMedias).toHaveBeenCalledTimes(2);
    });
  });

  describe('rendering', () => {
    it('should display movies tab as active by default', () => {
      expect(component.activeTab).toBe('movies');
    });

    it('should display error message when present', () => {
      collectionService.fetchCollectionMedias.and.returnValue(
        throwError(() => new Error('Test error')),
      );

      fixture.detectChanges();
      component.errorMessage = 'Test error message';
      fixture.detectChanges();

      const errorElement = fixture.nativeElement.querySelector('.text-red-200');
      expect(errorElement?.textContent).toContain('Test error message');
    });

    it('should render movies count badge', () => {
      component.movies = mockMovies;
      fixture.detectChanges();

      const badge = fixture.nativeElement.textContent;
      expect(badge).toContain('1');
    });
  });
});
