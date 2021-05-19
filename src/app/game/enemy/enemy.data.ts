import CharacterType from '../character/enums/character-type.enum';
import CharacterAction from '../character/models/character-action.model';
import Character from '../character/models/character.model';

const swordAction: CharacterAction = {
  action: 'sword',
  value: 5,
};
const shieldAction: CharacterAction = {
  action: 'shield',
  value: 11,
};
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
  name: 'goblin-archer',
  stats: {
    maxHealth: 60,
    currentHealth: 15,
    maxDamage: 12,
    damage: 10,
    currentShield: 8,
    type: CharacterType.ENEMY,
  },
  animations: [...exampleEnemy1.animations],
  statuses: [
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
