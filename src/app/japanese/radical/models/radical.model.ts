import CharacterType from '../../common/enums/character-type.enum';

export default interface Radical {
  readonly characters: string;
  readonly meanings: string[];
  readonly type: CharacterType;
}
