import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Review } from './review';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Review', () => {
  let component: Review;
  let fixture: ComponentFixture<Review>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Review],
    }).compileComponents();

    fixture = TestBed.createComponent(Review);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
