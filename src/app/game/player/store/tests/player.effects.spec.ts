import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import MathUtil from 'src/app/common/utils/math.util';
import Character from 'src/app/game/character/models/character.model';
import CharacterService from 'src/app/game/character/services/character.service';
import { attackCard } from 'src/app/game/deck/deck.data';
import { initialState } from 'src/app/game/deck/store/deck.reducer';
import AppStoreState from 'src/app/store/app.state';

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

  const updatedPlayer: Character = {
    ...defaultPlayer,
    stats: {
      ...defaultPlayer.stats,
      currentHealth: 100,
      damage: 20,
      currentShield: 10,
    },
  };
  const stateWithPlayerAndChosenCard: Partial<AppStoreState> = {
    player: {
      player: defaultPlayer,
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
      position: { x: 0, y: 50 },
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
