import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMedia } from './save-media.component';

describe('SaveMedia', () => {
  let component: SaveMedia;
  let fixture: ComponentFixture<SaveMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveMedia],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
