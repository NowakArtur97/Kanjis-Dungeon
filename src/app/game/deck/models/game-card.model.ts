import Character from '../../character/models/character.model';
import GameCardType from '../enums/game-card-type.enum';

export default interface GameCard {
  id?: number;
  name: string;
  animationName: string;
  cost: number;
  type: GameCardType;
  description: string;
  value?: number;
  statusValue?: number;
  maxStatusNumberOfActiveRounds?: number;
  apply(character: Character): void;
}
