import CharacterType from 'src/app/common/enums/character-type.enum';

export default interface Radical {
  readonly id: number;
  characters: string;
  readonly meanings: string[];
  readonly type: CharacterType;
}
