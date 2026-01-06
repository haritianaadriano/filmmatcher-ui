import { TestBed } from '@angular/core/testing';

import { SaveMediaService } from './save-media.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SaveMediaService', () => {
  let service: SaveMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SaveMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
