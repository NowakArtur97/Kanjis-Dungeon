import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionsSelectionComponent } from './quiz-questions-selection.component';

describe('QuizQuestionsSelectionComponent', () => {
  let component: QuizQuestionsSelectionComponent;
  let fixture: ComponentFixture<QuizQuestionsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizQuestionsSelectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
