import { ComponentFixture, TestBed } from '@angular/core/testing';
import KANJI from 'src/app/japanese/kanji/kanji.data';

import { QuizSummaryCardComponent } from './quiz-summary-card.component';

describe('QuizSummaryCardComponent', () => {
  let component: QuizSummaryCardComponent;
  let fixture: ComponentFixture<QuizSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizSummaryCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSummaryCardComponent);
    component = fixture.componentInstance;

    component.currentCharacter = KANJI[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
