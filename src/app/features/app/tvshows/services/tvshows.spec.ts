import { TestBed } from '@angular/core/testing';
import { TvshowsService } from './tvshows.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Tvshows', () => {
  let service: TvshowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TvshowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
