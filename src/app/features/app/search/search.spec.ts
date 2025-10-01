import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSearchMovieComponent } from './search.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Search', () => {
  let component: AppSearchMovieComponent;
  let fixture: ComponentFixture<AppSearchMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSearchMovieComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSearchMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
