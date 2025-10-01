import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSearchMovieComponent } from './search.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Search', () => {
  let component: AppSearchMovieComponent;
  let fixture: ComponentFixture<AppSearchMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSearchMovieComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSearchMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
