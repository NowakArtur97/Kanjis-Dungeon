import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/common/enums/character-type.enum';
import QuizService from 'src/app/quiz/services/quiz.service';
import { QuizStoreState } from 'src/app/quiz/store/quiz.reducer';
import Radical from 'src/app/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../quiz.actions';
import QuizEffects from '../quiz.effects';

const radical: Radical = {
  id: 1,
  characters: '一',
  meanings: ['ground'],
  type: CharacterType.RADICAL,
};
const quizState: QuizStoreState = {
  maxNumberOfQuestions: 12,
  nextQuestion: null,
  questions: [],
  answers: [],
  mistakes: [],
};
const mockState: Partial<AppStoreState> = {
  quiz: quizState,
};

describe('QuizEffects', () => {
  let quizEffects: QuizEffects;
  let actions$: ReplaySubject<any>;
  let store: Store<AppStoreState>;
  let storeSpy: jasmine.Spy;
  let quizService: QuizService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        QuizEffects,
        Store,
        provideMockActions(() => actions$),
        {
          provide: QuizService,
          useValue: jasmine.createSpyObj('quizService', ['getNextQuestion']),
        },
      ],
    })
  );

  beforeEach(() => {
    quizEffects = TestBed.inject(QuizEffects);
    store = TestBed.inject(Store);
    quizService = TestBed.inject(QuizService);
  });

  describe('setNextQuestion$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(QuizActions.setQuestions);
      storeSpy = spyOn(store, 'select').and.callFake((selector) =>
        of(mockState)
      );
      (quizService.getNextQuestion as jasmine.Spy).and.returnValue(radical);
    });

    it('should return a setNextQuestion action', () => {
      quizEffects.setNextQuestion$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          QuizActions.setNextQuestion({ nextQuestion: radical })
        );
        expect(quizService.getNextQuestion).toHaveBeenCalled();
      });
    });
  });
});
