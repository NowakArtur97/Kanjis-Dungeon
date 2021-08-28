import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import { imp, pigWarrior } from 'src/app/game/enemy/enemy.data';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import { DEFAULT_QUIZ_OPTIONS } from 'src/app/quiz/store/quiz.reducer';

import LevelType from '../../enums/level-type.enum';
import Level from '../../models/level.model';
import LevelService from '../../services/level.service';
import * as LevelActions from '../level.actions';
import LevelEffects from '../level.effects';
import { LevelStoreState } from '../level.reducer';

describe('LevelEffects', () => {
  let levelEffects: LevelEffects;
  let actions$: ReplaySubject<any>;
  let levelService: LevelService;

  const level1: Level = {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  };
  const level1WithId: Level = {
    ...level1,
    id: 1,
  };
  const level2: Level = {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  };
  const level2WithId: Level = {
    ...level2,
    id: 2,
  };
  const level3: Level = {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  };
  const level3WithId: Level = {
    ...level3,
    id: 1,
  };
  const level4: Level = {
    levelType: LevelType.MIX,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 24,
      questionTypes: [
        CharacterType.RADICAL,
        CharacterType.KANJI,
        CharacterType.VOCABULARY,
      ],
    },
  };
  const level4WithId: Level = {
    ...level4,
    id: 1,
  };
  const allLevels: Level[] = [level1, level2, level3, level4];
  const allLevelsWithIds: Level[] = [
    level1WithId,
    level2WithId,
    level3WithId,
    level4WithId,
  ];
  const initialState: LevelStoreState = {
    level: null,
    allLevels,
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        LevelEffects,
        provideMockStore({ initialState }),
        {
          provide: Store,
          useClass: MockStore,
        },
        provideMockActions(() => actions$),
        {
          provide: LevelService,
          useValue: jasmine.createSpyObj('levelService', ['setupLevelsIds']),
        },
      ],
    })
  );

  beforeEach(() => {
    levelEffects = TestBed.inject(LevelEffects);
    levelService = TestBed.inject(LevelService);
  });

  describe('setupLevels$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(LevelActions.chooseLevel);

      (levelService.setupLevelsIds as jasmine.Spy).and.returnValue(
        allLevelsWithIds
      );
    });

    it('should return a setLevels action', () => {
      levelEffects.setupLevels$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          LevelActions.setLevels({ allLevels: allLevelsWithIds })
        );
        expect(levelService.setupLevelsIds).toHaveBeenCalledTimes(1);
      });
    });
  });
});
