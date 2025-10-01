import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTvShowComponent } from './tvshows.component';

describe('Tvshows', () => {
  let component: AppTvShowComponent;
  let fixture: ComponentFixture<AppTvShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
