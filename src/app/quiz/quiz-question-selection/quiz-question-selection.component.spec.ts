import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionSelectionComponent } from './quiz-question-selection.component';

describe('QuizQuestionSelectionComponent', () => {
  let component: QuizQuestionSelectionComponent;
  let fixture: ComponentFixture<QuizQuestionSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizQuestionSelectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
