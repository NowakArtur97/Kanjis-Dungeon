import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLayoutComponent } from './quiz-layout.component';

describe('QuizLayoutComponent', () => {
  let component: QuizLayoutComponent;
  let fixture: ComponentFixture<QuizLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
