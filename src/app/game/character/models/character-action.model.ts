import CharacterActionType from '../enums/character-action-type.enum';
import Character from './character.model';

export default interface CharacterAction {
  readonly action: string;
  readonly value: number;
  readonly type: CharacterActionType;
  apply(character: Character, player: Character): void;
}
