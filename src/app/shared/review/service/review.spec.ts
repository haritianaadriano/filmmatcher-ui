import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Review', () => {
  let service: ReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
