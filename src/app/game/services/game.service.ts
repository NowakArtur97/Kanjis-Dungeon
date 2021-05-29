import { Injectable } from '@angular/core';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import QuizOptions from 'src/app/quiz/models/quiz-options.model';
import { DEFAULT_EXCLUDED_PROPERTIES, DEFAULT_MIN_NUMBER_OF_PROPERTIES } from 'src/app/quiz/store/quiz.reducer';

@Injectable({ providedIn: 'root' })
export default class GameService {
  chooseQuizOptionsForLevel(level: number): QuizOptions {
    // TODO: GameService: Choose options based on level/difficulty(?)
    return {
      numberOfQuestions: 3,
      minNumberOfProperties: DEFAULT_MIN_NUMBER_OF_PROPERTIES,
      shouldShowAnswer: true,
      shouldHideRandomProperties: false,
      excludedProperties: new Map([
        [CharacterType.RADICAL, DEFAULT_EXCLUDED_PROPERTIES],
        [CharacterType.KANJI, DEFAULT_EXCLUDED_PROPERTIES],
        [CharacterType.VOCABULARY, DEFAULT_EXCLUDED_PROPERTIES],
      ]),
      questionTypes: [CharacterType.RADICAL],
    };
  }
}
