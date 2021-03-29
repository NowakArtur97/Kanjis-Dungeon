import CharacterType from 'src/app/common/enums/character-type.enum';

export default interface QuizOptions {
  numberOfQuestions: number;
  minNumberOfProperties: number;
  excludedProperties: string[];
  questionTypes: CharacterType[];
}
