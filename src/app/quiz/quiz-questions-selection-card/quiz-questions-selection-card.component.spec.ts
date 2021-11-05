import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import RADICALS from 'src/app/japanese/radical/radical.data';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import { initialState, QuizStoreState } from '../store/quiz.reducer';
import { QuizQuestionsSelectionCardComponent } from './quiz-questions-selection-card.component';

describe('QuizQuestionsSelectionCardComponent', () => {
  let component: QuizQuestionsSelectionCardComponent;
  let fixture: ComponentFixture<QuizQuestionsSelectionCardComponent>;
  let store: Store<AppStoreState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizQuestionsSelectionCardComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionsSelectionCardComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);

    component.currentCharacter = RADICALS[0];

    spyOn(store, 'dispatch');
  });

  it('when select not preffered question should dispatch addPreferedQuestion action', () => {
    spyOn(store, 'select').and.returnValue(of(initialState));

    fixture.detectChanges();
    component.ngOnInit();

    component.onSelect(new MouseEvent('click'));

    expect(store.select).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      QuizActions.addPreferredQuestion({
        preferredQuestion: component.currentCharacter,
      })
    );
  });

  it('when select preffered question should dispatch removePreferedQuestion action', () => {
    const quizStatePreferredQuestions: QuizStoreState = {
      ...initialState,
      preferredQuestions: [component.currentCharacter],
    };
    spyOn(store, 'select').and.returnValue(of(quizStatePreferredQuestions));

    fixture.detectChanges();
    component.ngOnInit();

    component.onSelect(new MouseEvent('click'));

    expect(store.select).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      QuizActions.removePreferredQuestion({
        preferredQuestionToRemove: component.currentCharacter,
      })
    );
  });
});
