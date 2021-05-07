import Character from '../character/models/character.model';
import GameCardType from './enums/game-card-type.enum';
import GameCard from './models/game-card.model';

const attackCard: GameCard = {
  name: 'Attack',
  cost: 2,
  type: GameCardType.ATTACK,
  description: 'Deal 10 damage points',
  apply(character: Character): void {
    character.stats.currentHealth -= 10;
  },
};
const defenceCard: GameCard = {
  name: 'Defence',
  cost: 2,
  type: GameCardType.SKILL,
  description: 'Receive 10 block points',
  apply(character: Character): void {
    character.stats.currentShield += 10;
  },
};
const powerCard: GameCard = {
  name: 'Power',
  cost: 2,
  type: GameCardType.POWER,
  description: 'Deal 2 times more damage',
  apply(character: Character): void {
    character.stats.damage *= 2;
  },
};

export { attackCard, defenceCard, powerCard };
