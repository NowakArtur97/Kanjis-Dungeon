import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import MathUtil from 'src/app/common/utils/math.util';
import CharacterPosition from 'src/app/game/character/models/character-position.model';
import Character from 'src/app/game/character/models/character.model';
import CharacterService from 'src/app/game/character/services/character.service';
import { attackCard } from 'src/app/game/deck/deck.data';
import { initialState as deckInitialState } from 'src/app/game/deck/store/deck.reducer';
import { exampleEnemy1 } from 'src/app/game/enemy/enemy.data';
import { initialState as gameInitialState } from 'src/app/game/store/game.reducer';
import AppStoreState from 'src/app/store/app.state';

import * as EnemyActions from '../../../enemy/store/enemy.actions';
import * as GameActions from '../../../store/game.actions';
import defaultPlayer from '../../player.data';
import PlayerService from '../../services/player.service';
import * as PlayerActions from '../player.actions';
import PlayerEffects from '../player.effects';

describe('PlayerEffects', () => {
  let playerEffects: PlayerEffects;
  let actions$: ReplaySubject<any>;
  let playerService: PlayerService;
  let characterService: CharacterService;

  describe('with deck energy', () => {
    const animationPosition: CharacterPosition = {
      x: 10,
      y: 20,
      topOffset: 50,
    };
    const updatedPlayer: Character = {
      ...defaultPlayer,
      stats: {
        ...defaultPlayer.stats,
        currentHealth: 100,
        damage: 20,
        currentShield: 10,
      },
      position: animationPosition,
    };
    const stateWithPlayerAndChosenCard: Partial<AppStoreState> = {
      player: {
        player: defaultPlayer,
      },
      deck: {
        ...deckInitialState,
        chosenCard: attackCard,
      },
      game: {
        ...gameInitialState,
      },
    };

    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          PlayerEffects,
          provideMockStore({ initialState: stateWithPlayerAndChosenCard }),
          {
            provide: Store,
            useClass: MockStore,
          },
          provideMockActions(() => actions$),
          {
            provide: PlayerService,
            useValue: jasmine.createSpyObj('playerService', ['updatePlayer']),
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
      playerEffects = TestBed.inject(PlayerEffects);
      playerService = TestBed.inject(PlayerService);
      characterService = TestBed.inject(CharacterService);
    });

    describe('chooseLevel$', () => {
      const topOffset = 50;
      const playerWithPosition: Character = {
        ...defaultPlayer,
        position: { x: 0, y: 50, topOffset: 50 },
      };
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(GameActions.chooseLevel);
        spyOn(MathUtil, 'getRandomIntValue').and.returnValue(topOffset);
        (characterService.setRandomTopOffset as jasmine.Spy).and.returnValue(
          playerWithPosition
        );
      });

      it('should return a setPlayer action', () => {
        playerEffects.useCardOnPlayer$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            PlayerActions.setPlayer({ player: playerWithPosition })
          );
          expect(characterService.setRandomTopOffset).toHaveBeenCalledTimes(1);
          expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('useCardOnPlayer$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(PlayerActions.useCardOnPlayer);
        (playerService.updatePlayer as jasmine.Spy).and.returnValue(
          updatedPlayer
        );
      });

      it('should return a setPlayer and startCharacterAnimation actions', () => {
        playerEffects.useCardOnPlayer$
          .pipe(take(1))
          .subscribe((resultAction) => {
            expect(resultAction).toEqual(
              PlayerActions.setPlayer({
                player: updatedPlayer,
              })
            );
            expect(playerService.updatePlayer).toHaveBeenCalledTimes(1);
          });
        playerEffects.useCardOnPlayer$
          .pipe(skip(1), take(1))
          .subscribe((resultAction) => {
            expect(resultAction).toEqual(
              GameActions.startCharacterAnimation({
                playedAnimation: {
                  character: updatedPlayer,
                  animationName: attackCard.animationName,
                  animationPosition,
                },
              })
            );
            expect(playerService.updatePlayer).toHaveBeenCalledTimes(2);
          });
      });
    });

    describe('useCardOnEnemy$', () => {
      const enemyWithPosition: Character = {
        ...exampleEnemy1,
        id: 0,
        position: animationPosition,
      };

      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(
          EnemyActions.useCardOnEnemy({ enemy: enemyWithPosition })
        );
      });

      it('should return a startCharacterAnimation action', () => {
        playerEffects.useCardOnEnemy$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            GameActions.startCharacterAnimation({
              playedAnimation: {
                character: defaultPlayer,
                animationName: attackCard.animationName,
                animationPosition: enemyWithPosition.position,
              },
            })
          );
        });
      });
    });
  });

  describe('endPlayerTurn$', () => {
    describe('when Player does not have more energy', () => {
      const stateWithoutEnergy: Partial<AppStoreState> = {
        deck: {
          ...deckInitialState,
          remainingEnergy: 0,
        },
        game: {
          ...gameInitialState,
        },
      };
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            PlayerEffects,
            provideMockStore({ initialState: stateWithoutEnergy }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
            {
              provide: PlayerService,
              useValue: jasmine.createSpyObj('playerService', ['updatePlayer']),
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
        playerEffects = TestBed.inject(PlayerEffects);
        playerService = TestBed.inject(PlayerService);
        characterService = TestBed.inject(CharacterService);
      });

      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(
          GameActions.finishCharacterAnimation({ character: defaultPlayer })
        );
      });

      it('should return a changeTurn action', () => {
        playerEffects.endPlayerTurn$.subscribe((resultAction) => {
          expect(resultAction).toEqual(GameActions.changeTurn());
        });
      });
    });

    describe('when Player does have energy to use any card', () => {
      const stateWithToExpensiveCards: Partial<AppStoreState> = {
        deck: {
          ...deckInitialState,
          allCards: [attackCard],
          remainingEnergy: 1,
        },
        game: {
          ...gameInitialState,
        },
      };
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            PlayerEffects,
            provideMockStore({ initialState: stateWithToExpensiveCards }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
            {
              provide: PlayerService,
              useValue: jasmine.createSpyObj('playerService', ['updatePlayer']),
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
        playerEffects = TestBed.inject(PlayerEffects);
        playerService = TestBed.inject(PlayerService);
        characterService = TestBed.inject(CharacterService);
      });

      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(
          GameActions.finishCharacterAnimation({ character: defaultPlayer })
        );
      });

      it('should return a changeTurn action', () => {
        playerEffects.endPlayerTurn$.subscribe((resultAction) => {
          expect(resultAction).toEqual(GameActions.changeTurn());
        });
      });
    });
  });
});
