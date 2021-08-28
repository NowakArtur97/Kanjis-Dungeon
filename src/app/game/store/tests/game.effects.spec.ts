import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import RADICALS from 'src/app/japanese/radical/radical.data';
import QuizOptions from 'src/app/quiz/models/quiz-options.model';
import {
  DEFAULT_EXCLUDED_PROPERTIES,
  DEFAULT_MIN_NUMBER_OF_PROPERTIES,
  initialState as quizInitialState,
} from 'src/app/quiz/store/quiz.reducer';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../../quiz/store/quiz.actions';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import GamePhase from '../../enums/game-phase.enum';
import GameTurn from '../../enums/game-turn.enum';
import LevelService from '../../level/services/level.service';
import * as LevelActions from '../../level/store/level.actions';
import { initialState as levelInitialState } from '../../level/store/level.reducer';
import * as PlayerActions from '../../player/store/player.actions';
import * as GameActions from '../../store/game.actions';
import GameEffects from '../game.effects';
import { initialState } from '../game.reducer';

describe('GameEffects', () => {
  let gameEffects: GameEffects;
  let actions$: ReplaySubject<any>;
  let store: any;
  let levelService: LevelService;

  const stateWithZeroQuestions: Partial<AppStoreState> = {
    quiz: {
      ...quizInitialState,
    },
    level: {
      ...levelInitialState,
    },
  };
  const stateWithQuestions: Partial<AppStoreState> = {
    ...stateWithZeroQuestions,
    quiz: {
      ...quizInitialState,
      questions: [RADICALS[0]],
    },
  };
  const stateWithEnemyTurn: Partial<AppStoreState> = {
    ...stateWithZeroQuestions,
    game: {
      ...initialState,
      turn: GameTurn.ENEMY_TURN,
      phase: GamePhase.QUIZ,
    },
  };
  const stateWithPlayerTurn: Partial<AppStoreState> = {
    ...stateWithZeroQuestions,
    game: {
      ...initialState,
      turn: GameTurn.PLAYER_TURN,
      phase: GamePhase.QUIZ,
    },
  };

  describe('chooseLevel$', () => {
    describe('with enemy turn', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            GameEffects,
            provideMockStore({ initialState: stateWithEnemyTurn }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
            {
              provide: LevelService,
              useValue: jasmine.createSpyObj('levelService', [
                'chooseQuizOptionsForLevel',
              ]),
            },
          ],
        })
      );

      beforeEach(() => {
        gameEffects = TestBed.inject(GameEffects);
        store = TestBed.inject(MockStore);
      });

      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(LevelActions.chooseLevel);
      });

      describe('when chosing level', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(LevelActions.chooseLevel);
        });
        it('should return a startEnemyTurn action', () => {
          gameEffects.changeTurn$.subscribe((resultAction) => {
            expect(resultAction).toEqual(EnemyActions.startEnemyTurn());
          });
        });
      });

      describe('when changing turn', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(GameActions.changeTurn);
        });
        it('should return a startEnemyTurn action', () => {
          gameEffects.changeTurn$.subscribe((resultAction) => {
            expect(resultAction).toEqual(EnemyActions.startEnemyTurn());
          });
        });
      });
    });

    describe('with player turn', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            GameEffects,
            provideMockStore({ initialState: stateWithPlayerTurn }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
          ],
        })
      );

      beforeEach(() => {
        gameEffects = TestBed.inject(GameEffects);
        store = TestBed.inject(MockStore);
      });

      describe('when chosing level', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(LevelActions.chooseLevel);
        });

        it('should return a startPlayerTurn action', () => {
          gameEffects.changeTurn$.subscribe((resultAction) => {
            expect(resultAction).toEqual(PlayerActions.startPlayerTurn());
          });
        });
      });

      describe('when changing turn', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(GameActions.changeTurn);
        });

        it('should return a startPlayerTurn action', () => {
          gameEffects.changeTurn$.subscribe((resultAction) => {
            expect(resultAction).toEqual(PlayerActions.startPlayerTurn());
          });
        });
      });
    });
  });

  describe('startPlayerTurn$', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          GameEffects,
          provideMockStore({ initialState: stateWithPlayerTurn }),
          provideMockActions(() => actions$),
          {
            provide: LevelService,
            useValue: jasmine.createSpyObj('levelService', [
              'chooseQuizOptionsForLevel',
            ]),
          },
        ],
      })
    );

    beforeEach(() => {
      gameEffects = TestBed.inject(GameEffects);
      levelService = TestBed.inject(LevelService);
    });

    describe('when starting level', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(PlayerActions.startPlayerTurn);
      });

      it('should return a changeQuizOptions action', () => {
        const quizOptions: QuizOptions = {
          numberOfQuestions: 3,
          minNumberOfProperties: DEFAULT_MIN_NUMBER_OF_PROPERTIES,
          shouldShowAnswer: true,
          shouldHideRandomProperties: false,
          excludedProperties: new Map([
            [CharacterType.RADICAL, DEFAULT_EXCLUDED_PROPERTIES],
            [CharacterType.KANJI, DEFAULT_EXCLUDED_PROPERTIES],
            [CharacterType.VOCABULARY, DEFAULT_EXCLUDED_PROPERTIES],
          ]),
          questionTypes: [CharacterType.RADICAL],
        };
        (levelService.chooseQuizOptionsForLevel as jasmine.Spy).and.returnValue(
          quizOptions
        );

        gameEffects.startPlayerTurn$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            QuizActions.changeQuizOptions({ quizOptions })
          );
          expect(levelService.chooseQuizOptionsForLevel).toHaveBeenCalledTimes(
            1
          );
        });
      });
    });
  });

  describe('changePhase$', () => {
    describe('with zero number of question', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            GameEffects,
            provideMockStore({ initialState: stateWithZeroQuestions }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
          ],
        })
      );

      beforeEach(() => {
        gameEffects = TestBed.inject(GameEffects);
        store = TestBed.inject(MockStore);
      });

      describe('when answered correctly', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(QuizActions.addAnswer);
        });

        it('should return a changePhase action', () => {
          gameEffects.changePhase$.subscribe((resultAction) => {
            expect(resultAction).toEqual(GameActions.changePhase());
          });
        });
      });

      describe('when end of enemy turn', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(EnemyActions.endEnemyTurn);
        });

        it('should return a changePhase action', () => {
          gameEffects.changePhase$.subscribe((resultAction) => {
            expect(resultAction).toEqual(GameActions.changePhase());
          });
        });
      });
    });

    describe('with not answered questions', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            GameEffects,
            provideMockStore({ initialState: stateWithQuestions }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
          ],
        })
      );

      beforeEach(() => {
        gameEffects = TestBed.inject(GameEffects);
        store = TestBed.inject(MockStore);
      });

      describe('when answered correctly', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(QuizActions.addAnswer);
        });

        it('should not return a changePhase action', () => {
          gameEffects.changePhase$.subscribe((resultAction) => {
            expect(resultAction).not.toEqual(GameActions.changePhase());
          });
        });
      });

      describe('when end of enemy turn', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(EnemyActions.endEnemyTurn);
        });

        it('should return not a changePhase action', () => {
          gameEffects.changePhase$.subscribe((resultAction) => {
            expect(resultAction).not.toEqual(GameActions.changePhase());
          });
        });
      });
    });
  });
});
