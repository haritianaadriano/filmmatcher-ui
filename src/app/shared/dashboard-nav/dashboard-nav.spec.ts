import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNav } from './dashboard-nav.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DashboardNav', () => {
  let component: DashboardNav;
  let fixture: ComponentFixture<DashboardNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNav],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
