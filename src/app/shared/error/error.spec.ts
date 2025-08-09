import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHttpComponent } from './error.component';

describe('Http', () => {
  let component: ErrorHttpComponent;
  let fixture: ComponentFixture<ErrorHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHttpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
