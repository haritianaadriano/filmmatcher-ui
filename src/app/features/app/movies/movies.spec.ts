import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMoviesComponent } from './app-movies.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Movies', () => {
  let component: AppMoviesComponent;
  let fixture: ComponentFixture<AppMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMoviesComponent],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
