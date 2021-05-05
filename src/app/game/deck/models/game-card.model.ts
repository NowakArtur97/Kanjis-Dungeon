import GameCardType from '../enums/game-card-type.enum';

export default interface GameCard {
  name: string;
  cost: number;
  type: GameCardType;
  description: string;
}
