import { TestBed } from '@angular/core/testing';

import { Search } from './search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Search', () => {
  let service: Search;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(Search);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
