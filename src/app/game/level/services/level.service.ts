import { Injectable } from '@angular/core';
import QuizOptions from 'src/app/quiz/models/quiz-options.model';

import Level from '../models/level.model';

@Injectable({ providedIn: 'root' })
export default class LevelService {
  // TODO: TEST
  setupLevelsIds(allLevels: Level[]): Level[] {
    let id = 1;
    return allLevels.map((level) => {
      level.id = id++;
      return level;
    });
  }

  // TODO: TEST
  chooseQuizOptionsForLevel = (
    level: number,
    allLevels: Level[]
  ): QuizOptions =>
    allLevels.find((levelData) => levelData.id === level).quizOptions;
}
