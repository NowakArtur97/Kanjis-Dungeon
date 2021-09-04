import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCardSummaryComponent } from './quiz-card-summary.component';

describe('QuizCardSummaryComponent', () => {
  let component: QuizCardSummaryComponent;
  let fixture: ComponentFixture<QuizCardSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizCardSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
