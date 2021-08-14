import Character from '../character/models/character.model';
import GameCardType from './enums/game-card-type.enum';
import GameCard from './models/game-card.model';

const thunderStrikeCard: GameCard = {
  id: 1,
  name: 'Thunder Strike',
  animationName: 'thunder_strike',
  cost: 2,
  type: GameCardType.ATTACK,
  description: `Summon lightning and deal 10 damage points`,
  value: 10,
  apply(character: Character): void {
    // TODO: Refactor with CharacterActions
    const { stats } = character;
    if (stats.currentShield > 0) {
      const remainingDamage =
        stats.currentShield < this.value ? this.value - stats.currentShield : 0;
      stats.currentShield -= this.value;
      if (stats.currentShield < 0) {
        stats.currentShield = 0;
      }
      stats.currentHealth -= remainingDamage;
    } else {
      stats.currentHealth -= this.value;
    }
  },
};
const phoenixSummoningCard: GameCard = {
  id: 2,
  name: 'Phoenix Summoning',
  animationName: 'phoenix_summoning',
  cost: 2,
  type: GameCardType.ATTACK,
  description: 'Summon phoenix and deal 14 damage points',
  value: 14,
  apply(character: Character): void {
    // TODO: Refactor with CharacterActions
    const { stats } = character;
    if (stats.currentShield > 0) {
      const remainingDamage =
        stats.currentShield < this.value ? this.value - stats.currentShield : 0;
      stats.currentShield -= this.value;
      if (stats.currentShield < 0) {
        stats.currentShield = 0;
      }
      stats.currentHealth -= remainingDamage;
    } else {
      stats.currentHealth -= this.value;
    }
  },
};
// const defenceCard: GameCard = {
//   id: 2,
//   name: 'Defence',
//   animationName: 'sword_attack', // TODO: Create real animations
//   cost: 2,
//   type: GameCardType.SKILL,
//   description: 'Receive 10 block points',
//   value: 10,
//   apply(character: Character): void {
//     character.stats.currentShield += this.value;
//   },
// };
// const powerCard: GameCard = {
//   id: 3,
//   name: 'Power',
//   animationName: 'sword_attack', // TODO: Create real animations
//   cost: 2,
//   type: GameCardType.POWER,
//   description: 'Deal 2 times more damage',
//   value: 2,
//   apply(character: Character): void {
//     character.stats.damage *= this.value;
//   },
// };

export { thunderStrikeCard, phoenixSummoningCard };
