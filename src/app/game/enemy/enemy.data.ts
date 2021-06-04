import CharacterType from '../character/enums/character-type.enum';
import Character from '../character/models/character.model';
import { shieldAction, swordAction } from './enemy-action.data';

const exampleEnemy1: Character = {
  name: 'goblin-archer',
  stats: {
    maxHealth: 70,
    currentHealth: 70,
    maxDamage: 12,
    damage: 10,
    currentShield: 0,
    type: CharacterType.ENEMY,
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
      animationTimeInMiliseconds: 1100,
      animationIterationCount: 'Infinite',
    },
  ],
  statuses: [
    {
      spriteSheet: 'heart',
      remainingNumberOfActiveRounds: 2,
    },
  ],
  currentAction: swordAction,
  allActions: [swordAction, shieldAction],
};
const exampleEnemy3: Character = {
  name: 'goblin-archer',
  stats: {
    maxHealth: 50,
    currentHealth: 20,
    damage: 10,
    maxDamage: 12,
    currentShield: 2,
    type: CharacterType.ENEMY,
  },
  animations: [...exampleEnemy1.animations],
  statuses: [
    {
      spriteSheet: 'heart',
      remainingNumberOfActiveRounds: 2,
    },
  ],
  currentAction: shieldAction,
  allActions: [swordAction, shieldAction],
};

export { exampleEnemy1, exampleEnemy2, exampleEnemy3 };
const allEnemies = [exampleEnemy1, exampleEnemy2, exampleEnemy3];
export { allEnemies };
