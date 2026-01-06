import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMediaComponent } from './save-media.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SaveMedia', () => {
  let component: SaveMediaComponent;
  let fixture: ComponentFixture<SaveMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveMediaComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
