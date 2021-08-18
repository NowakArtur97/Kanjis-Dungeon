import { addStatusAction, changeShieldAction, damageAction } from '../character/character-action/character-action.data';
import { onFireStatus, stunnedStatus } from '../character/character-status.data';
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
    damageAction(this.value, character);
    addStatusAction(stunnedStatus, character);
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
    damageAction(this.value, character);
    addStatusAction(onFireStatus, character);
  },
};
const defenceCard: GameCard = {
  id: 3,
  name: 'Defence',
  animationName: 'thunder_strike', // TODO: Create real animation and card
  cost: 2,
  type: GameCardType.SKILL,
  description: 'Receive 10 block points',
  value: 10,
  apply(character: Character): void {
    changeShieldAction(this.value, character);
  },
};
const powerCard: GameCard = {
  id: 4,
  name: 'Power',
  animationName: 'phoenix_summoning', // TODO: Create real animation and card
  cost: 2,
  type: GameCardType.POWER,
  description: 'Deal 2 times more damage',
  value: 2,
  apply(character: Character): void {
    character.stats.damage *= this.value;
  },
};

export { thunderStrikeCard, phoenixSummoningCard, defenceCard, powerCard };
