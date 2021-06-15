import CharacterPosition from './character-position.model';
import Character from './character.model';

export default interface CharacterPlayedAnimation {
  character: Character;
  animationName: string;
  animationPosition: CharacterPosition;
}
