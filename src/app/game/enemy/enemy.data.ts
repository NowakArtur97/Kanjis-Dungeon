import CharacterType from '../character/enums/character-type.enum';
import Character from '../character/models/character.model';
import { shieldAction, swordAction } from './enemy-action.data';

const pigWarrior: Character = {
  name: 'pig_warrior',
  stats: {
    maxHealth: 30,
    currentHealth: 20,
    maxDamage: 12,
    damage: 8,
    currentShield: 15,
    type: CharacterType.ENEMY,
  },
  animations: [
    {
      spriteSheet: 'idle',
      numberOfFrames: 4,
      animationTimeInMiliseconds: 600,
      animationIterationCount: 'Infinite',
      spriteWidth: 21,
      spriteHeight: 22,
    },
    {
      spriteSheet: 'melee_attack',
      numberOfFrames: 7,
      animationTimeInMiliseconds: 560,
      animationIterationCount: '1',
      spriteWidth: 31,
      spriteHeight: 32,
      spriteOffsetX: 17,
      spriteOffsetY: 5,
    },
  ],
  statuses: [],
  currentAction: swordAction,
  allActions: [swordAction],
};

const imp: Character = {
  name: 'imp',
  stats: {
    maxHealth: 90,
    currentHealth: 85,
    maxDamage: 20,
    damage: 14,
    currentShield: 2,
    type: CharacterType.ENEMY,
  },
  animations: [
    {
      spriteSheet: 'idle',
      numberOfFrames: 4,
      animationTimeInMiliseconds: 600,
      animationIterationCount: 'Infinite',
      spriteWidth: 10,
      spriteHeight: 17,
    },
    {
      spriteSheet: 'melee_attack',
      numberOfFrames: 7,
      animationTimeInMiliseconds: 560,
      animationIterationCount: '1',
      spriteWidth: 17,
      spriteHeight: 17,
      spriteOffsetX: 15,
      spriteOffsetY: 10,
    },
    {
      spriteSheet: 'defence',
      numberOfFrames: 9,
      animationTimeInMiliseconds: 720,
      animationIterationCount: '1',
      spriteWidth: 24,
      spriteHeight: 108,
      spriteOffsetX: 0,
      spriteOffsetY: 0,
    },
  ],
  statuses: [],
  currentAction: swordAction,
  allActions: [swordAction, shieldAction],
};

export { pigWarrior, imp };
const allEnemies = [pigWarrior, imp];
export { allEnemies };
