import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import RADICALS from 'src/app/japanese/radical/radical.data';
import AppStoreState from 'src/app/store/app.state';

import { QuizStoreState } from '../store/quiz.reducer';
import { QuizQuestionsSelectionComponent } from './quiz-questions-selection.component';

describe('QuizQuestionsSelectionComponent', () => {
  let component: QuizQuestionsSelectionComponent;
  let fixture: ComponentFixture<QuizQuestionsSelectionComponent>;
  let store: Store<AppStoreState>;

  const quizStateWithPreferredQuestions: Partial<QuizStoreState> = {
    preferedQuestions: [...RADICALS],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizQuestionsSelectionComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionsSelectionComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
  });

  describe('when initialize component', () => {
    it('should select preffered questions from store', () => {
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestions)
      );

      fixture.detectChanges();
      component.ngOnInit();

      expect(store.select).toHaveBeenCalled();
    });
  });
});
