import QuizOptions from 'src/app/quiz/models/quiz-options.model';

import Character from '../../character/models/character.model';
import LevelType from '../enums/level-type.enum';

export default interface Level {
  id?: number;
  readonly levelType: LevelType;
  readonly enemies: Character[];
  readonly quizOptions: QuizOptions;
}
