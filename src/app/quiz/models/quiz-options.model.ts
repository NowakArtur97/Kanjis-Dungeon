import CharacterType from 'src/app/common/enums/character-type.enum';

export default interface QuizOptions {
  numberOfQuestions: number;
  shouldShowAnswer: boolean;
  minNumberOfProperties?: number;
  excludedProperties: Map<CharacterType, string[]>;
  questionTypes: CharacterType[];
}
