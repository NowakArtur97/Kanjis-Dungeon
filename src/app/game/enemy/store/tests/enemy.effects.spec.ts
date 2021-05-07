import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/game/character/enums/character-type.enum';
import Character from 'src/app/game/character/models/character.model';

import * as GameActions from '../../../store/game.actions';
import EnemyService from '../../services/enemy.service';
import * as EnemyActions from '../enemy.actions';
import EnemyEffects from '../enemy.effects';

describe('EnemyEffects', () => {
  let enemyEffects: EnemyEffects;
  let actions$: ReplaySubject<any>;
  let enemyService: EnemyService;
  const enemy1: Character = {
    name: 'goblin-archer',
    stats: {
      maxHealth: 70,
      currentHealth: 70,
      maxDamage: 12,
      damage: 10,
      currentShield: 0,
      type: CharacterType.ENEMY,
    },
    animations: [
      {
        spriteSheet: 'idle',
        numberOfFrames: 4,
        animationTimeInMiliseconds: 600,
        animationIterationCount: 'Infinite',
      },
    ],
    statuses: [
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
    ],
    action: {
      action: 'sword',
      value: 5,
    },
  };
  const enemy2: Character = {
    name: 'goblin-archer',
    stats: {
      maxHealth: 60,
      currentHealth: 15,
      maxDamage: 12,
      damage: 10,
      currentShield: 8,
      type: CharacterType.ENEMY,
    },
    animations: [...enemy1.animations],
    statuses: [
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
    ],
    action: {
      action: 'sword',
      value: 5,
    },
  };
  const enemy3: Character = {
    name: 'goblin-archer',
    stats: {
      maxHealth: 50,
      currentHealth: 20,
      damage: 10,
      maxDamage: 12,
      currentShield: 2,
      type: CharacterType.ENEMY,
    },
    animations: [...enemy1.animations],
    statuses: [
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
    ],
    action: {
      action: 'shield',
      value: 11,
    },
  };
  const enemies: Character[] = [enemy1, enemy2, enemy3];
  const updatedEnemies: Character[] = [
    {
      ...enemy1,
      stats: {
        ...enemy1.stats,
        currentHealth: 70,
        damage: 12,
        currentShield: 10,
      },
    },
    {
      ...enemy2,
      stats: {
        ...enemy2.stats,
        currentHealth: 35,
        damage: 12,
        currentShield: 18,
      },
    },
    {
      ...enemy3,
      stats: {
        ...enemy3.stats,
        currentHealth: 30,
        currentShield: 6,
      },
    },
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
          ]),
        },
      ],
    })
  );

  beforeEach(() => {
    enemyEffects = TestBed.inject(EnemyEffects);
    enemyService = TestBed.inject(EnemyService);
  });

  describe('setEnemies$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(GameActions.chooseLevel);
      (enemyService.chooseEnemies as jasmine.Spy).and.returnValue(enemies);
    });

    it('should return a setEnemies action', () => {
      enemyEffects.chooseEnemies$.subscribe((resultAction) => {
        expect(resultAction).toEqual(EnemyActions.setEnemies({ enemies }));
        expect(enemyService.chooseEnemies).toHaveBeenCalledTimes(1);
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
});
