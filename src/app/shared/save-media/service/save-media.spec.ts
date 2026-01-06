import { TestBed } from '@angular/core/testing';

import { SaveMediaService } from './save-media.service';

describe('SaveMediaService', () => {
  let service: SaveMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
