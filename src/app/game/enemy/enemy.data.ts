import CharacterType from '../character/enums/character-type.enum';
import Character from '../character/models/character.model';
import { shieldAction, swordAction } from './enemy-action.data';

const exampleEnemy1: Character = {
  name: 'goblin-archer',
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
      spriteWidth: 32,
      spriteHeight: 32,
    },
  ],
  statuses: [
    {
      spriteSheet: 'book',
      remainingNumberOfActiveRounds: 3,
    },
    {
      spriteSheet: 'book',
      remainingNumberOfActiveRounds: 3,
    },
    {
      spriteSheet: 'book',
      remainingNumberOfActiveRounds: 3,
    },
    {
      spriteSheet: 'book',
      remainingNumberOfActiveRounds: 3,
    },
    {
      spriteSheet: 'book',
      remainingNumberOfActiveRounds: 3,
    },
  ],
  currentAction: swordAction,
  allActions: [swordAction, shieldAction],
};

const exampleEnemy2: Character = {
  name: 'ogre',
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
      numberOfFrames: 11,
      animationTimeInMiliseconds: 1700,
      animationIterationCount: 'Infinite',
      spriteWidth: 64,
      spriteHeight: 64,
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
  ],
  currentAction: swordAction,
  allActions: [swordAction, shieldAction],
};
const exampleEnemy3: Character = {
  name: 'goblin-archer',
  stats: {
    maxHealth: 20,
    currentHealth: 10,
    maxDamage: 11,
    damage: 6,
    currentShield: 105,
    type: CharacterType.ENEMY,
  },
  animations: [...exampleEnemy1.animations],
  statuses: [
    {
      spriteSheet: 'heart',
      remainingNumberOfActiveRounds: 2,
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
  currentAction: shieldAction,
  allActions: [swordAction, shieldAction],
};

export { exampleEnemy1, exampleEnemy2, exampleEnemy3 };
const allEnemies = [exampleEnemy1, exampleEnemy2, exampleEnemy3];
export { allEnemies };
