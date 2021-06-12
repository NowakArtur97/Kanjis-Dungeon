import { getTestBed, TestBed } from '@angular/core/testing';

import Character from '../../character/models/character.model';
import { attackCard } from '../../deck/deck.data';
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
          currentShield: 10,
        },
      };
      const updatedPlayerExpected: Character = {
        ...playerWithShield,
        stats: {
          ...playerWithShield.stats,
          currentShield:
            playerWithShield.stats.currentShield - attackCard.value,
        },
      };
      const updatedPlayerActual = playerService.updatePlayer(
        attackCard,
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
      const updatedPlayerExpected: Character = {
        ...playerWithoutShield,
        stats: {
          ...playerWithoutShield.stats,
          currentHealth:
            playerWithoutShield.stats.currentHealth - attackCard.value,
        },
      };
      const updatedPlayerActual = playerService.updatePlayer(
        attackCard,
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
