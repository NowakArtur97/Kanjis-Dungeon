import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import Character from 'src/app/game/character/models/character.model';
import defaultPlayer from 'src/app/game/player/player.data';

import * as PlayerActions from '../../../player/store/player.actions';
import * as GameActions from '../../../store/game.actions';
import { shieldAction, swordAction } from '../../enemy-action.data';
import { exampleEnemy1, exampleEnemy2, exampleEnemy3 } from '../../enemy.data';
import EnemyService from '../../services/enemy.service';
import * as EnemyActions from '../enemy.actions';
import EnemyEffects from '../enemy.effects';

describe('EnemyEffects', () => {
  let enemyEffects: EnemyEffects;
  let actions$: ReplaySubject<any>;
  let enemyService: EnemyService;

  const enemies: Character[] = [exampleEnemy1, exampleEnemy2, exampleEnemy3];
  const updatedEnemy1: Character = {
    ...exampleEnemy1,
    stats: {
      ...exampleEnemy1.stats,
      currentHealth: 70,
      damage: 12,
      currentShield: 10,
    },
  };
  const updatedEnemy2: Character = {
    ...exampleEnemy2,
    stats: {
      ...exampleEnemy2.stats,
      currentHealth: 35,
      damage: 12,
      currentShield: 18,
    },
  };
  const updatedEnemy3: Character = {
    ...exampleEnemy3,
    stats: {
      ...exampleEnemy3.stats,
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

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        EnemyEffects,
        Store,
        provideMockActions(() => actions$),
        {
          provide: EnemyService,
          useValue: jasmine.createSpyObj('enemyService', [
            'chooseEnemies',
            'updateEnemies',
            'chooseRandomEnemiesActions',
            'performActions',
          ]),
        },
      ],
    })
  );

  beforeEach(() => {
    enemyEffects = TestBed.inject(EnemyEffects);
    enemyService = TestBed.inject(EnemyService);
  });

  describe('chooseEnemies$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(GameActions.chooseLevel);
      (enemyService.chooseEnemies as jasmine.Spy).and.returnValue(enemies);
      (enemyService.chooseRandomEnemiesActions as jasmine.Spy).and.returnValue(
        enemiesWithActions
      );
    });

    it('should return a setEnemies action', () => {
      enemyEffects.chooseLevel$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          EnemyActions.setEnemies({ enemies: enemiesWithActions })
        );
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
      (enemyService.updateEnemies as jasmine.Spy).and.returnValue(
        updatedEnemies
      );
    });

    it('should return a setEnemies action', () => {
      enemyEffects.useCardOnEnemy$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          EnemyActions.setEnemies({ enemies: updatedEnemies })
        );
        expect(enemyService.updateEnemies).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('startEnemyTurn$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(EnemyActions.startEnemyTurn);
      (enemyService.performActions as jasmine.Spy).and.returnValue({
        enemies: enemiesWithActions,
        player: defaultPlayer,
      });
    });

    it('should return a setEnemies, endEnemyTurn and setPlayer actions', () => {
      enemyEffects.startEnemyTurn$.pipe(take(1)).subscribe((resultAction) => {
        expect(resultAction).toEqual(
          EnemyActions.setEnemies({ enemies: enemiesWithActions })
        );
        expect(enemyService.performActions).toHaveBeenCalledTimes(1);
      });
      enemyEffects.startEnemyTurn$
        .pipe(skip(1), take(1))
        .subscribe((resultAction) => {
          expect(resultAction).toEqual(EnemyActions.endEnemyTurn());
          expect(enemyService.performActions).toHaveBeenCalledTimes(2);
        });
      enemyEffects.startEnemyTurn$
        .pipe(skip(2), take(1))
        .subscribe((resultAction) => {
          expect(resultAction).toEqual(
            PlayerActions.setPlayer({ player: defaultPlayer })
          );
          expect(enemyService.performActions).toHaveBeenCalledTimes(3);
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
