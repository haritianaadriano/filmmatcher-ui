import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCollectionsComponent } from './collections.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Collections', () => {
  let component: AppCollectionsComponent;
  let fixture: ComponentFixture<AppCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCollectionsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
