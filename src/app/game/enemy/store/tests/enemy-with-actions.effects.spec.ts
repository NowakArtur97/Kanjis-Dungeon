import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import Character from 'src/app/game/character/models/character.model';
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

  const allEnemies: Character[] = [pigWarrior, imp, pigWarrior];
  const playerAfterAction: Character = {
    ...defaultPlayer,
    stats: {
      ...defaultPlayer.stats,
      currentShield: defaultPlayer.stats.currentShield - swordAction.value,
    },
  };
  const enemyWithAction1: Character = {
    id: 1,
    ...pigWarrior,
    stats: {
      ...pigWarrior.stats,
      currentHealth: 70,
      damage: 12,
      currentShield: 10,
    },
    currentAction: swordAction,
  };
  const enemyWithAction2: Character = {
    id: 2,
    ...imp,
    stats: {
      ...imp.stats,
      currentHealth: 35,
      damage: 12,
      currentShield: 18,
    },
    currentAction: shieldAction,
  };
  const enemyWithAction3: Character = {
    id: 3,
    ...pigWarrior,
    stats: {
      ...pigWarrior.stats,
      currentHealth: 30,
      currentShield: 6,
    },
    currentAction: swordAction,
  };
  const enemyWithoutAction1: Character = {
    ...enemyWithAction1,
    currentAction: null,
  };
  const enemiesWithActions: Character[] = [
    enemyWithAction1,
    enemyWithAction2,
    enemyWithAction3,
  ];
  const stateWithEnemiesWithActions: Partial<AppStoreState> = {
    player: {
      ...PlayerReducer.initialState,
    },
    deck: {
      ...DeckReducer.initialState,
      chosenCard: phoenixSummoningCard,
    },
    enemy: {
      allEnemies,
      enemies: enemiesWithActions,
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

  describe('state with enemies with actions', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          EnemyEffects,
          provideMockStore({
            initialState: stateWithEnemiesWithActions,
          }),
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
        ],
      })
    );

    beforeEach(() => {
      enemyEffects = TestBed.inject(EnemyEffects);
      enemyService = TestBed.inject(EnemyService);
    });

    describe('finishCharacterAnimation$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(EnemyActions.endEnemyTurn);
        actions$.next(
          GameActions.finishCharacterAnimation({
            character: enemyWithAction1,
          })
        );
        (enemyService.performAction as jasmine.Spy).and.returnValue({
          enemy: enemyWithoutAction1,
          player: playerAfterAction,
        });
        (enemyService.chooseEnemyForAction as jasmine.Spy).and.returnValue(
          enemyWithAction2
        );
      });

      it('should return a setEnemy, startCharacterAnimation and setPlayer actions', () => {
        enemyEffects.finishCharacterAnimation$
          .pipe(take(1))
          .subscribe((resultAction) => {
            expect(resultAction).toEqual(
              EnemyActions.setEnemy({ enemy: enemyWithoutAction1 })
            );
            expect(enemyService.performAction).toHaveBeenCalledTimes(1);
            expect(enemyService.chooseEnemyForAction).toHaveBeenCalledTimes(1);
          });
        enemyEffects.finishCharacterAnimation$
          .pipe(skip(1), take(1))
          .subscribe((resultAction) => {
            expect(resultAction).toEqual(
              GameActions.startCharacterAnimation({
                playedAnimation: {
                  character: enemyWithAction2,
                  animationName: enemyWithAction2.currentAction.action,
                  animationPosition: playerAfterAction.position,
                },
              })
            );
            expect(enemyService.performAction).toHaveBeenCalledTimes(2);
            expect(enemyService.chooseEnemyForAction).toHaveBeenCalledTimes(2);
          });
        enemyEffects.finishCharacterAnimation$
          .pipe(skip(2))
          .subscribe((resultAction) => {
            expect(resultAction).toEqual(
              PlayerActions.setPlayer({ player: playerAfterAction })
            );
            expect(enemyService.performAction).toHaveBeenCalledTimes(3);
            expect(enemyService.chooseEnemyForAction).toHaveBeenCalledTimes(3);
          });
      });
    });
  });
});
