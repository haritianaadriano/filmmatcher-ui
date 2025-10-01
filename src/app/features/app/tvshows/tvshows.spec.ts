import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTvShowComponent } from './tvshows.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Tvshows', () => {
  let component: AppTvShowComponent;
  let fixture: ComponentFixture<AppTvShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      imports: [AppTvShowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTvShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
