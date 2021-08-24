import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import Character from 'src/app/game/character/models/character.model';
import CharacterService from 'src/app/game/character/services/character.service';
import { phoenixSummoningCard } from 'src/app/game/deck/deck.data';
import * as DeckReducer from 'src/app/game/deck/store/deck.reducer';
import defaultPlayer from 'src/app/game/player/player.data';
import * as PlayerReducer from 'src/app/game/player/store/player.reducer';
import { initialState as gameInitialState } from 'src/app/game/store/game.reducer';
import AppStoreState from 'src/app/store/app.state';

import * as PlayerActions from '../../../player/store/player.actions';
import * as GameActions from '../../../store/game.actions';
import { shieldAction, swordAction } from '../../enemy-action.data';
import { imp, pigWarrior } from '../../enemy.data';
import EnemyService from '../../services/enemy.service';
import * as EnemyActions from '../enemy.actions';
import EnemyEffects from '../enemy.effects';

describe('EnemyEffects', () => {
  let enemyEffects: EnemyEffects;
  let actions$: ReplaySubject<any>;
  let enemyService: EnemyService;
  let characterService: CharacterService;

  const enemies: Character[] = [pigWarrior, imp, pigWarrior];
  const updatedEnemy1: Character = {
    id: 1,
    ...pigWarrior,
    stats: {
      ...pigWarrior.stats,
      currentHealth: 70,
      damage: 12,
      currentShield: 10,
    },
  };
  const updatedEnemy2: Character = {
    id: 2,
    ...imp,
    stats: {
      ...imp.stats,
      currentHealth: 35,
      damage: 12,
      currentShield: 18,
    },
  };
  const updatedEnemy3: Character = {
    id: 3,
    ...pigWarrior,
    stats: {
      ...pigWarrior.stats,
      currentHealth: 30,
      currentShield: 6,
    },
  };
  const updatedEnemies: Character[] = [
    updatedEnemy1,
    updatedEnemy2,
    updatedEnemy3,
  ];
  const enemyWithAction1: Character = {
    ...updatedEnemy1,
    currentAction: swordAction,
  };
  const enemyWithAction2: Character = {
    ...updatedEnemy2,
    currentAction: shieldAction,
  };
  const enemyWithAction3: Character = {
    ...updatedEnemy3,
    currentAction: swordAction,
  };
  const enemiesWithActions: Character[] = [
    enemyWithAction1,
    enemyWithAction2,
    enemyWithAction3,
  ];
  const topOffsets = [50, 51, 52];
  const enemyWithPosition1: Character = {
    ...enemyWithAction1,
    position: { x: 0, y: 0, topOffset: topOffsets[0] },
  };
  const enemyWithPosition2: Character = {
    ...enemyWithAction2,
    position: { x: 0, y: 0, topOffset: topOffsets[1] },
  };
  const enemyWithPosition3: Character = {
    ...enemyWithAction3,
    position: { x: 0, y: 0, topOffset: topOffsets[2] },
  };
  const enemiesWithPositions: Character[] = [
    enemyWithPosition1,
    enemyWithPosition2,
    enemyWithPosition3,
  ];
  const stateWithEnemies: Partial<AppStoreState> = {
    player: {
      ...PlayerReducer.initialState,
    },
    deck: {
      ...DeckReducer.initialState,
      chosenCard: phoenixSummoningCard,
    },
    enemy: {
      allEnemies: enemies,
      enemies,
    },
    game: {
      ...gameInitialState,
      playedAnimation: {
        character: pigWarrior,
        animationPosition: { x: 0, y: 0, topOffset: 50 },
        animationName: 'attack',
      },
    },
  };

  describe('', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          EnemyEffects,
          provideMockStore({ initialState: stateWithEnemies }),
          {
            provide: Store,
            useClass: MockStore,
          },
          provideMockActions(() => actions$),
          {
            provide: EnemyService,
            useValue: jasmine.createSpyObj('enemyService', [
              'chooseEnemies',
              'useCardOnEnemy',
              'chooseRandomEnemiesActions',
              'performAction',
              'applyStatusesOnEnemies',
              'chooseFirstEnemyForAction',
              'chooseEnemyForAction',
            ]),
          },
          {
            provide: CharacterService,
            useValue: jasmine.createSpyObj('characterService', [
              'setRandomTopOffset',
            ]),
          },
        ],
      })
    );

    beforeEach(() => {
      enemyEffects = TestBed.inject(EnemyEffects);
      enemyService = TestBed.inject(EnemyService);
      characterService = TestBed.inject(CharacterService);
    });

    describe('chooseLevel$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(GameActions.chooseLevel);

        (enemyService.chooseEnemies as jasmine.Spy).and.returnValue(enemies);
        (enemyService.chooseRandomEnemiesActions as jasmine.Spy).and.returnValue(
          enemiesWithActions
        );
        (characterService.setRandomTopOffset as jasmine.Spy).and.returnValues(
          ...enemiesWithPositions
        );
      });

      it('should return a setEnemies action', () => {
        enemyEffects.chooseLevel$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            EnemyActions.setEnemies({ enemies: enemiesWithPositions })
          );
          expect(characterService.setRandomTopOffset).toHaveBeenCalledTimes(3);
          expect(enemyService.chooseEnemies).toHaveBeenCalledTimes(1);
          expect(enemyService.chooseRandomEnemiesActions).toHaveBeenCalledTimes(
            1
          );
        });
      });
    });

    describe('useCardOnEnemy$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(EnemyActions.useCardOnEnemy);
        (enemyService.useCardOnEnemy as jasmine.Spy).and.returnValue(
          updatedEnemies
        );
      });

      it('should return a setEnemies action', () => {
        enemyEffects.useCardOnEnemy$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            EnemyActions.setEnemies({ enemies: updatedEnemies })
          );
          expect(enemyService.useCardOnEnemy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('applyStatusesOnEnemies$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(PlayerActions.startPlayerTurn);
      });

      it('with enemies without statuses should return a setEnemies action', () => {
        enemyEffects.useCardOnEnemy$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            EnemyActions.setEnemies({ enemies: updatedEnemies })
          );
          expect(enemyService.applyStatusesOnEnemies).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('startEnemyTurn$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(EnemyActions.startEnemyTurn);
        (enemyService.chooseFirstEnemyForAction as jasmine.Spy).and.returnValue(
          enemies[0]
        );
      });

      it('should return a startCharacterAnimation actions', () => {
        enemyEffects.startEnemyTurn$.subscribe((resultAction) => {
          const playedAnimation = {
            character: pigWarrior,
            animationName: pigWarrior.currentAction.action,
            animationPosition: defaultPlayer.position,
          };
          expect(resultAction).toEqual(
            GameActions.startCharacterAnimation({ playedAnimation })
          );
          expect(enemyService.chooseFirstEnemyForAction).toHaveBeenCalledTimes(
            1
          );
        });
      });
    });

    describe('endEnemyTurn$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(EnemyActions.endEnemyTurn);
        (enemyService.chooseRandomEnemiesActions as jasmine.Spy).and.returnValue(
          enemiesWithActions
        );
      });

      it('should return a setEnemies and changeTurn actions', () => {
        enemyEffects.endEnemyTurn$.pipe(take(1)).subscribe((resultAction) => {
          expect(resultAction).toEqual(
            EnemyActions.setEnemies({ enemies: enemiesWithActions })
          );
          expect(enemyService.chooseRandomEnemiesActions).toHaveBeenCalledTimes(
            1
          );
        });
        enemyEffects.endEnemyTurn$.pipe(skip(1)).subscribe((resultAction) => {
          expect(resultAction).toEqual(GameActions.changeTurn());
          expect(enemyService.chooseRandomEnemiesActions).toHaveBeenCalledTimes(
            2
          );
        });
      });
    });
  });
});
