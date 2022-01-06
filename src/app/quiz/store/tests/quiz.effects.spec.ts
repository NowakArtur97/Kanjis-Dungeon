import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import ALL_LEVELS from 'src/app/game/level/level.data';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import KANJI from 'src/app/japanese/kanji/kanji.data';
import Kanji from 'src/app/japanese/kanji/models/kanji.model';
import Radical from 'src/app/japanese/radical/models/radical.model';
import RADICALS from 'src/app/japanese/radical/radical.data';
import Word from 'src/app/japanese/vocabulary/models/word.model';
import VOCABULARY from 'src/app/japanese/vocabulary/vocabulary.data';
import QuizService from 'src/app/quiz/services/quiz.service';
import AppStoreState from 'src/app/store/app.state';

import * as VocabularyActions from '../../../japanese/vocabulary/store/vocabulary.actions';
import QuizOptions from '../../models/quiz-options.model';
import * as QuizActions from '../quiz.actions';
import QuizEffects from '../quiz.effects';
import { initialState } from '../quiz.reducer';

const radical: Radical = {
  characters: '一',
  meanings: ['ground'],
  type: CharacterType.RADICAL,
};
const radical2: Radical = {
  characters: '二',
  meanings: ['two'],
  type: CharacterType.RADICAL,
};
const radicals: Radical[] = [radical, radical2];
const kanji: Kanji[] = [
  {
    characters: '上',
    meanings: ['above', 'up', 'over'],
    onyomi: ['じょう'],
    kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '下',
    meanings: ['below', 'down', 'under', 'beneath'],
    onyomi: ['か', 'げ'],
    kunyomi: ['した', 'さ', 'くだ', 'お'],
    type: CharacterType.KANJI,
  },
];
const vocabulary: Word[] = [
  {
    characters: '大人',
    meanings: ['adult', 'mature'],
    reading: 'おとな',
    type: CharacterType.VOCABULARY,
  },
  {
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
      answers: [KANJI[0], KANJI[1], KANJI[2]],
      mistakes: [VOCABULARY[0], VOCABULARY[1], VOCABULARY[2]],
    },
    radical: { radicals: RADICALS },
    kanji: { kanji: KANJI },
    vocabulary: { vocabulary: VOCABULARY },
    level: { level: null, allLevels: ALL_LEVELS },
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
              'selectFromPrefferedQuestions',
              'saveQuizProgressToStorage',
              'cleanQuizProgressInStorage',
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
      describe('QuizActions.changeQuizOptions and QuizActions.repeatQuiz', () => {
        [QuizActions.changeQuizOptions, QuizActions.repeatQuiz].forEach(
          (action) => {
            beforeEach(() => {
              actions$ = new ReplaySubject(1);
              actions$.next(action);
              (quizService.selectFromPrefferedQuestions as jasmine.Spy).and.returnValues(
                []
              );
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
                expect(
                  quizService.selectFromPrefferedQuestions
                ).toHaveBeenCalledTimes(1);
                expect(quizService.prepareQuestions).toHaveBeenCalledTimes(3);
              });
            });
          }
        );
      });
    });

    describe('QuizActions.repeatQuiz', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.repeatQuiz);
        (quizService.selectFromPrefferedQuestions as jasmine.Spy).and.returnValues(
          []
        );
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
          expect(
            quizService.selectFromPrefferedQuestions
          ).toHaveBeenCalledTimes(1);
          expect(quizService.prepareQuestions).toHaveBeenCalledTimes(3);
        });
      });
    });

    describe('setQuestionsOnApplicationStartup$', () => {
      describe('VocabularyActions.setVocabulary', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(VocabularyActions.setVocabulary);
        });

        it('should return setQuestions action', () => {
          quizEffects.setQuestionsOnApplicationStartup$.subscribe(
            (resultAction) => {
              expect(resultAction).toEqual(
                QuizActions.setQuestions({
                  questions: stateWithQuestions.quiz.questions,
                })
              );
              expect(
                quizService.selectFromPrefferedQuestions
              ).not.toHaveBeenCalled();
              expect(quizService.prepareQuestions).not.toHaveBeenCalled();
            }
          );
        });
      });
    });

    describe('saveQuizProgress$', () => {
      [QuizActions.setNextQuestion, QuizActions.setQuestions].forEach(
        (action) => {
          beforeEach(() => {
            actions$ = new ReplaySubject(1);
            actions$.next(action);
            (quizService.saveQuizProgressToStorage as jasmine.Spy).and.callThrough();
          });

          it('should return a setQuizProgress action', () => {
            quizEffects.saveQuizProgress$.subscribe(() => {
              expect(
                quizService.saveQuizProgressToStorage
              ).toHaveBeenCalledOnceWith(
                stateWithQuestions.quiz.questions,
                stateWithQuestions.quiz.answers,
                stateWithQuestions.quiz.mistakes,
                stateWithQuestions.quiz.quizOptions
              );
            });
          });
        }
      );
    });

    describe('cleanQuizProgres$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.showSummary);
        (quizService.cleanQuizProgressInStorage as jasmine.Spy).and.callThrough();
      });

      it('should clean quiz progress in storage', () => {
        quizEffects.cleanQuizProgres$.subscribe(() => {
          expect(quizService.cleanQuizProgressInStorage).toHaveBeenCalledTimes(
            1
          );
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
            useValue: jasmine.createSpyObj('quizService', [
              'getNextQuestion',
              'selectFromPrefferedQuestions',
              'prepareQuestions',
              'loadPreferredQuestionsFromStorage',
              'loadQuizProgressFromStorage',
            ]),
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

    describe('setQuestionsOnApplicationStartup$', () => {
      describe('VocabularyActions.setVocabulary', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(VocabularyActions.setVocabulary);
          (quizService.selectFromPrefferedQuestions as jasmine.Spy).and.returnValues(
            []
          );
          (quizService.prepareQuestions as jasmine.Spy).and.returnValues(
            radicals,
            [...radicals, ...kanji],
            [...radicals, ...kanji, ...vocabulary]
          );
        });

        it('should return setQuestions action', () => {
          quizEffects.setQuestionsOnApplicationStartup$.subscribe(
            (resultAction) => {
              expect(resultAction).toEqual(
                QuizActions.setQuestions({
                  questions: [...radicals, ...kanji, ...vocabulary],
                })
              );
              expect(
                quizService.selectFromPrefferedQuestions
              ).toHaveBeenCalledTimes(1);
              expect(quizService.prepareQuestions).toHaveBeenCalledTimes(3);
            }
          );
        });
      });
    });

    describe('getPreferredQuestionFromStorage$', () => {
      const preferredQuestions: Radical[] = [
        {
          characters: '隹',
          meanings: ['turkey'],
          type: CharacterType.RADICAL,
        },
        {
          characters: '几',
          meanings: ['table'],
          type: CharacterType.RADICAL,
        },
      ];
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.getDataFromStorage);
        (quizService.loadPreferredQuestionsFromStorage as jasmine.Spy).and.returnValue(
          preferredQuestions
        );
      });

      it('should return a setPreferredQuestions action', () => {
        quizEffects.getPreferredQuestionFromStorage$.subscribe(
          (resultAction) => {
            expect(resultAction).toEqual(
              QuizActions.setPreferredQuestions({ preferredQuestions })
            );
            expect(
              quizService.loadPreferredQuestionsFromStorage
            ).toHaveBeenCalledTimes(1);
          }
        );
      });
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

    describe('getQuizProgresFromStorage$', () => {
      const quizOptions: QuizOptions = {
        numberOfQuestions: 1,
        minNumberOfProperties: 1,
        shouldShowAnswer: true,
        shouldHideRandomProperties: true,
        excludedProperties: new Map([
          [CharacterType.RADICAL, ['characters', 'type']],
        ]),
        questionTypes: [CharacterType.RADICAL],
      };
      const answers: Radical[] = [...radicals];
      const questions: Radical[] = [...kanji];
      const mistakes: Radical[] = [...vocabulary];
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.getDataFromStorage);
        (quizService.loadQuizProgressFromStorage as jasmine.Spy).and.returnValue(
          {
            quizOptions,
            answers,
            questions,
            mistakes,
          }
        );
      });

      it('should return a setQuizProgress action', () => {
        quizEffects.getQuizProgresFromStorage$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            QuizActions.setQuizProgress({
              questions,
              answers,
              mistakes,
              quizOptions,
            })
          );
          expect(quizService.loadQuizProgressFromStorage).toHaveBeenCalledTimes(
            1
          );
        });
      });
    });
  });

  describe('state with preferred questions', () => {
    const stateWitthPreferredQuestions: Partial<AppStoreState> = {
      ...stateWithoutQuestions,
      quiz: {
        ...initialState,
        preferredQuestions: [radical],
        answers: [],
        questions: [],
      },
    };
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          QuizEffects,
          provideMockStore({ initialState: stateWitthPreferredQuestions }),
          {
            provide: Store,
            useClass: MockStore,
          },
          provideMockActions(() => actions$),
          {
            provide: QuizService,
            useValue: jasmine.createSpyObj('quizService', [
              'loadPreferredQuestionsFromStorage',
              'savePreferredQuestionsToStorage',
            ]),
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

    describe('getPreferredQuestionFromStorage$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.setQuestions);
        (quizService.loadPreferredQuestionsFromStorage as jasmine.Spy).and.returnValue(
          radicals
        );
      });

      it('should return a setPreferredQuestions action', () => {
        quizEffects.getPreferredQuestionFromStorage$.subscribe(
          (resultAction) => {
            expect(resultAction).toEqual(
              QuizActions.setPreferredQuestions({
                preferredQuestions: radicals,
              })
            );
            expect(
              quizService.loadPreferredQuestionsFromStorage
            ).toHaveBeenCalledTimes(1);
          }
        );
      });
    });

    describe('savePreferredQuestions$', () => {
      it('should call savePreferredQuestionsToStorage method', () => {
        actions$ = new ReplaySubject(1);
        actions$.next(
          QuizActions.addPreferredQuestion({ preferredQuestion: radical })
        );
        quizEffects.savePreferredQuestions$.subscribe(() => {
          expect(
            quizService.savePreferredQuestionsToStorage
          ).toHaveBeenCalledWith([radical]);
        });
      });

      it('should call savePreferredQuestionsToStorage method', () => {
        actions$ = new ReplaySubject(1);
        actions$.next(
          QuizActions.removePreferredQuestion({
            preferredQuestionToRemove: radical2,
          })
        );
        quizEffects.savePreferredQuestions$.subscribe(() => {
          expect(
            quizService.savePreferredQuestionsToStorage
          ).toHaveBeenCalledWith([radical]);
        });
      });

      it('should call savePreferredQuestionsToStorage method', () => {
        actions$ = new ReplaySubject(1);
        actions$.next(
          QuizActions.addPreferredQuestions({
            preferredQuestions: [radical, radical2],
          })
        );
        quizEffects.savePreferredQuestions$.subscribe(() => {
          expect(
            quizService.savePreferredQuestionsToStorage
          ).toHaveBeenCalledWith([radical]);
        });
      });

      it('should call savePreferredQuestionsToStorage method', () => {
        actions$ = new ReplaySubject(1);
        actions$.next(
          QuizActions.removePreferredQuestions({
            preferredQuestionsToRemove: [radical, radical2],
          })
        );
        quizEffects.savePreferredQuestions$.subscribe(() => {
          expect(
            quizService.savePreferredQuestionsToStorage
          ).toHaveBeenCalledWith([radical]);
        });
      });
    });

    describe('setNextQuestion$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.setQuestions);
      });

      it('should not return any action', () => {
        quizEffects.setNextQuestion$.subscribe(() => {
          expect(quizService.getNextQuestion).not.toHaveBeenCalled();
        });
      });
    });
  });
});
