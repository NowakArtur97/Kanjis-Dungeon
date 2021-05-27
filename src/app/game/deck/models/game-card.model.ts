import Character from '../../character/models/character.model';
import GameCardType from '../enums/game-card-type.enum';

export default interface GameCard {
  id?: number;
  name: string;
  cost: number;
  type: GameCardType;
  description: string;
  value?: number;
  apply(character: Character): void;
}
