import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionMoviesComponent } from './collection-movies.component';

describe('Movies', () => {
  let component: CollectionMoviesComponent;
  let fixture: ComponentFixture<CollectionMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionMoviesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
