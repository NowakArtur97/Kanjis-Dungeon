import { Injectable } from '@angular/core';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import QuizOptions from 'src/app/quiz/models/quiz-options.model';
import { DEFAULT_QUIZ_OPTIONS } from 'src/app/quiz/store/quiz.reducer';

@Injectable({ providedIn: 'root' })
export default class GameService {
  chooseQuizOptionsForLevel(level: number): QuizOptions {
    // TODO: GameService: Choose options based on level/difficulty(?)
    return {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 1,
      questionTypes: [CharacterType.KANJI],
    };
  }
}
