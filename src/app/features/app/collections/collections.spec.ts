import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCollectionsComponent } from './collections.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Collections', () => {
  let component: AppCollectionsComponent;
  let fixture: ComponentFixture<AppCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCollectionsComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
