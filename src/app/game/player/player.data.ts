import CharacterType from '../character/enums/character-type.enum';
import Character from '../character/models/character.model';

const defaultPlayer: Character = {
  name: 'player',
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
      spriteWidth: 16,
      spriteHeight: 27,
    },
    {
      spriteSheet: 'sword_attack',
      numberOfFrames: 5,
      animationTimeInMiliseconds: 600,
      animationIterationCount: '1',
      spriteWidth: 48,
      spriteHeight: 28,
    },
  ],
  statuses: [
    {
      spriteSheet: 'heart',
      remainingNumberOfActiveRounds: 2,
    },
    {
      spriteSheet: 'book',
      remainingNumberOfActiveRounds: 3,
    },
    {
      spriteSheet: 'heart',
      remainingNumberOfActiveRounds: 2,
    },
    {
      spriteSheet: 'book',
      remainingNumberOfActiveRounds: 3,
    },
    {
      spriteSheet: 'heart',
      remainingNumberOfActiveRounds: 2,
    },
    {
      spriteSheet: 'book',
      remainingNumberOfActiveRounds: 3,
    },
    {
      spriteSheet: 'heart',
      remainingNumberOfActiveRounds: 2,
    },
    {
      spriteSheet: 'book',
      remainingNumberOfActiveRounds: 3,
    },
  ],
};

export default defaultPlayer;
