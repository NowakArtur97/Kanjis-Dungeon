import { getTestBed, TestBed } from '@angular/core/testing';

import { burnedStatus } from '../../character/character-status.data';
import CharacterStatus from '../../character/models/character-status.model';
import Character from '../../character/models/character.model';
import { phoenixSummoningCard } from '../../deck/deck.data';
import defaultPlayer from '../player.data';
import PlayerService from './player.service';

describe('playerService', () => {
  let injector: TestBed;
  let playerService: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [PlayerService],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    playerService = injector.inject(PlayerService);
  });

  describe('when update player', () => {
    it('with shield should return player with damaged shield', () => {
      const playerWithShield: Character = {
        ...defaultPlayer,
        id: 0,
        stats: {
          ...defaultPlayer.stats,
          currentShield: 14,
        },
      };
      const onFireStatusWithValue: CharacterStatus = {
        ...burnedStatus,
        value: phoenixSummoningCard.statusValue,
        maxRemainingNumberOfActiveRounds:
          phoenixSummoningCard.maxStatusNumberOfActiveRounds,
      };
      const updatedPlayerExpected: Character = {
        ...playerWithShield,
        stats: {
          ...playerWithShield.stats,
          currentShield:
            playerWithShield.stats.currentShield - phoenixSummoningCard.value,
        },
        statuses: [onFireStatusWithValue],
      };
      const updatedPlayerActual = playerService.updatePlayer(
        phoenixSummoningCard,
        playerWithShield
      );

      expect(updatedPlayerActual).toEqual(updatedPlayerExpected);
      expect(updatedPlayerActual.stats.currentHealth).toBe(
        updatedPlayerExpected.stats.currentHealth
      );
      expect(updatedPlayerActual.stats.currentShield).toBe(
        updatedPlayerExpected.stats.currentShield
      );
    });

    it('without shield should return player with damaged health', () => {
      const playerWithoutShield: Character = {
        ...defaultPlayer,
        id: 0,
        stats: {
          ...defaultPlayer.stats,
          currentShield: 0,
        },
      };
      const onFireStatusWithValue: CharacterStatus = {
        ...burnedStatus,
        value: phoenixSummoningCard.statusValue,
        maxRemainingNumberOfActiveRounds:
          phoenixSummoningCard.maxStatusNumberOfActiveRounds,
      };
      const updatedPlayerExpected: Character = {
        ...playerWithoutShield,
        stats: {
          ...playerWithoutShield.stats,
          currentHealth:
            playerWithoutShield.stats.currentHealth -
            phoenixSummoningCard.value,
        },
        statuses: [onFireStatusWithValue],
      };
      const updatedPlayerActual = playerService.updatePlayer(
        phoenixSummoningCard,
        playerWithoutShield
      );

      expect(updatedPlayerActual).toEqual(updatedPlayerExpected);
      expect(updatedPlayerActual.stats.currentHealth).toBe(
        updatedPlayerExpected.stats.currentHealth
      );
      expect(updatedPlayerActual.stats.currentShield).toBe(
        updatedPlayerExpected.stats.currentShield
      );
    });
  });
});
