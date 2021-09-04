import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSummaryCardComponent } from './quiz-summary-card.component';

describe('QuizSummaryCardComponent', () => {
  let component: QuizSummaryCardComponent;
  let fixture: ComponentFixture<QuizSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSummaryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
