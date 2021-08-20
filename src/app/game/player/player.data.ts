import CharacterType from '../character/enums/character-type.enum';
import Character from '../character/models/character.model';

const defaultPlayer: Character = {
  id: 0,
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
      spriteWidth: 41,
      spriteHeight: 31,
    },
    {
      spriteSheet: 'thunder_strike',
      numberOfFrames: 12,
      animationTimeInMiliseconds: 960,
      animationIterationCount: '1',
      spriteWidth: 60,
      spriteHeight: 48,
      spriteOffsetX: 40,
      spriteOffsetY: -27,
    },
    {
      spriteSheet: 'phoenix_summoning',
      numberOfFrames: 20,
      animationTimeInMiliseconds: 1600,
      animationIterationCount: '1',
      spriteWidth: 79,
      spriteHeight: 48,
      spriteOffsetX: 42,
      spriteOffsetY: -29,
    },
  ],
  statuses: [],
};

export default defaultPlayer;
