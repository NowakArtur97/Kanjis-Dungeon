import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import KANJI from 'src/app/japanese/kanji/kanji.data';
import Kanji from 'src/app/japanese/kanji/models/kanji.model';
import Radical from 'src/app/japanese/radical/models/radical.model';
import RADICALS from 'src/app/japanese/radical/radical.data';
import Word from 'src/app/japanese/vocabulary/models/word.model';
import VOCABULARY from 'src/app/japanese/vocabulary/vocabulary.data';
import QuizService from 'src/app/quiz/services/quiz.service';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../quiz.actions';
import QuizEffects from '../quiz.effects';
import { initialState } from '../quiz.reducer';

const radical: Radical = {
  id: 1,
  characters: '一',
  meanings: ['ground'],
  type: CharacterType.RADICAL,
};
const radicals: Radical[] = [
  radical,
  {
    id: 2,
    characters: '二',
    meanings: ['two'],
    type: CharacterType.RADICAL,
  },
];
const kanji: Kanji[] = [
  {
    id: 1,
    characters: '上',
    meanings: ['above', 'up', 'over'],
    onyomi: ['じょう'],
    kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
    type: CharacterType.KANJI,
  },
  {
    id: 2,
    characters: '下',
    meanings: ['below', 'down', 'under', 'beneath'],
    onyomi: ['か', 'げ'],
    kunyomi: ['した', 'さ', 'くだ', 'お'],
    type: CharacterType.KANJI,
  },
];
const vocabulary: Word[] = [
  {
    id: 1,
    characters: '大人',
    meanings: ['adult', 'mature'],
    reading: 'おとな',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 2,
    characters: '一人',
    meanings: ['alone', 'one person'],
    reading: 'ひとり',
    type: CharacterType.VOCABULARY,
  },
];

describe('QuizEffects', () => {
  let quizEffects: QuizEffects;
  let actions$: ReplaySubject<any>;
  let quizService: QuizService;

  const stateWithQuestions: Partial<AppStoreState> = {
    quiz: {
      ...initialState,
      questions: [RADICALS[0], RADICALS[1], RADICALS[2]],
    },
    radical: { radicals: RADICALS },
    kanji: { kanji: KANJI },
    vocabulary: { vocabulary: VOCABULARY },
  };
  const stateWithoutQuestions: Partial<AppStoreState> = {
    ...stateWithQuestions,
    quiz: {
      ...initialState,
      questions: [],
      nextQuestion: undefined,
    },
  };

  describe('state with questions', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), RouterTestingModule],
        providers: [
          QuizEffects,
          provideMockStore({ initialState: stateWithQuestions }),
          {
            provide: Store,
            useClass: MockStore,
          },
          provideMockActions(() => actions$),
          {
            provide: QuizService,
            useValue: jasmine.createSpyObj('quizService', [
              'getNextQuestion',
              'prepareQuestions',
            ]),
          },
        ],
      })
    );

    beforeEach(() => {
      quizEffects = TestBed.inject(QuizEffects);
      quizService = TestBed.inject(QuizService);
    });

    describe('setNextQuestion$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.setQuestions);
        (quizService.getNextQuestion as jasmine.Spy).and.returnValue(radical);
      });

      it('should return a setNextQuestion action', () => {
        quizEffects.setNextQuestion$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            QuizActions.setNextQuestion({ nextQuestion: radical })
          );
          expect(quizService.getNextQuestion).toHaveBeenCalledWith(
            stateWithQuestions.quiz.questions
          );
        });
      });
    });

    describe('setQuestions$', () => {
      describe('QuizActions.changeQuizOptions', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(QuizActions.changeQuizOptions);
          (quizService.prepareQuestions as jasmine.Spy).and.returnValues(
            radicals,
            [...radicals, ...kanji],
            [...radicals, ...kanji, ...vocabulary]
          );
        });

        it('should return setQuestions action', () => {
          quizEffects.setQuestions$.subscribe((resultAction) => {
            expect(resultAction).toEqual(
              QuizActions.setQuestions({
                questions: [...radicals, ...kanji, ...vocabulary],
              })
            );
            expect(quizService.prepareQuestions).toHaveBeenCalledTimes(3);
          });
        });
      });
    });
    describe('QuizActions.repeatQuiz', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.repeatQuiz);
        (quizService.prepareQuestions as jasmine.Spy).and.returnValues(
          radicals,
          [...radicals, ...kanji],
          [...radicals, ...kanji, ...vocabulary]
        );
      });

      it('should return setQuestions action', () => {
        quizEffects.setQuestions$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            QuizActions.setQuestions({
              questions: [...radicals, ...kanji, ...vocabulary],
            })
          );
          expect(quizService.prepareQuestions).toHaveBeenCalledTimes(3);
        });
      });
    });
  });

  describe('state without questions', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          QuizEffects,
          provideMockStore({ initialState: stateWithoutQuestions }),
          {
            provide: Store,
            useClass: MockStore,
          },
          provideMockActions(() => actions$),
          {
            provide: QuizService,
            useValue: jasmine.createSpyObj('quizService', ['getNextQuestion']),
          },
          {
            provide: Router,
            useValue: {
              url: '/quiz',
            },
          },
        ],
      })
    );

    beforeEach(() => {
      quizEffects = TestBed.inject(QuizEffects);
      quizService = TestBed.inject(QuizService);
    });

    describe('setNextQuestion$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.setQuestions);
        (quizService.getNextQuestion as jasmine.Spy).and.returnValue(undefined);
      });

      it('should return a showSummary action', () => {
        quizEffects.setNextQuestion$.subscribe((resultAction) => {
          expect(resultAction).toEqual(QuizActions.showSummary());
          expect(quizService.getNextQuestion).toHaveBeenCalledWith(
            stateWithoutQuestions.quiz.questions
          );
        });
      });
    });
  });
});
