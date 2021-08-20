import CharacterStatusType from '../enums/character-status-type.enum';
import Character from './character.model';

export default interface CharacterStatus {
  readonly spriteSheet: string;
  remainingNumberOfActiveRounds: number;
  maxRemainingNumberOfActiveRounds?: number;
  type: CharacterStatusType;
  value?: number;
  apply?(character: Character): void;
}
