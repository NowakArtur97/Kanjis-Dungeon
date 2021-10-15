import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionsSelectionCardComponent } from './quiz-questions-selection-card.component';

describe('QuizQuestionsSelectionCardComponent', () => {
  let component: QuizQuestionsSelectionCardComponent;
  let fixture: ComponentFixture<QuizQuestionsSelectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizQuestionsSelectionCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionsSelectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
