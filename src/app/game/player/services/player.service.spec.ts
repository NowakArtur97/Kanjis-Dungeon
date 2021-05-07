import { getTestBed, TestBed } from '@angular/core/testing';

import CharacterType from '../../character/enums/character-type.enum';
import Character from '../../character/models/character.model';
import GameCardType from '../../deck/enums/game-card-type.enum';
import GameCard from '../../deck/models/game-card.model';
import PlayerService from './player.service';

describe('playerService', () => {
  let injector: TestBed;
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
    it('should return updated player', () => {
      const updatedPlayerExpected: Character = {
        ...player,
        stats: {
          ...player.stats,
          currentHealth: player.stats.currentHealth - 10,
        },
      };
      const attackCard: GameCard = {
        name: 'Attack',
        cost: 2,
        type: GameCardType.ATTACK,
        description: 'Deal 10 damage points',
        apply(character: Character): void {
          character.stats.currentHealth -= 10;
        },
      };
      const updatedPlayerActual = playerService.updatePlayer(
        attackCard,
        player
      );

      expect(updatedPlayerActual).toEqual(updatedPlayerExpected);
    });
  });
});
