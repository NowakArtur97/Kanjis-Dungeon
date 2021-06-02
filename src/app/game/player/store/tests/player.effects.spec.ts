import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/game/character/enums/character-type.enum';
import Character from 'src/app/game/character/models/character.model';
import { attackCard } from 'src/app/game/deck/deck.data';
import { initialState } from 'src/app/game/deck/store/deck.reducer';
import AppStoreState from 'src/app/store/app.state';

import PlayerService from '../../services/player.service';
import * as PlayerActions from '../player.actions';
import PlayerEffects from '../player.effects';

describe('PlayerEffects', () => {
  let playerEffects: PlayerEffects;
  let actions$: ReplaySubject<any>;
  let playerService: PlayerService;

  const player: Character = {
    name: 'example-character',
    stats: {
      currentHealth: 100,
      maxHealth: 100,
      damage: 20,
      maxDamage: 22,
      currentShield: 10,
      type: CharacterType.PLAYER,
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
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
    ],
  };
  const updatedPlayer: Character = {
    ...player,
    stats: {
      ...player.stats,
      currentHealth: 100,
      damage: 20,
      currentShield: 10,
    },
  };
  const stateWithPlayerAndChosenCard: Partial<AppStoreState> = {
    player: {
      player,
    },
    deck: {
      ...initialState,
      chosenCard: attackCard,
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
      ],
    })
  );

  beforeEach(() => {
    playerEffects = TestBed.inject(PlayerEffects);
    playerService = TestBed.inject(PlayerService);
  });

  describe('useCardOnPlayer$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(PlayerActions.useCardOnPlayer);
      (playerService.updatePlayer as jasmine.Spy).and.returnValue(
        updatedPlayer
      );
    });

    it('should return a setPlayer action', () => {
      playerEffects.useCardOnPlayer$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          PlayerActions.setPlayer({ player: updatedPlayer })
        );
        expect(playerService.updatePlayer).toHaveBeenCalledTimes(1);
      });
    });
  });
});
