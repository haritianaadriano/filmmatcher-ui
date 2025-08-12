import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHttpComponent } from './error.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Http', () => {
  let component: ErrorHttpComponent;
  let fixture: ComponentFixture<ErrorHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHttpComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
