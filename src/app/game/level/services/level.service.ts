import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';

import Level from '../models/level.model';

@Injectable({ providedIn: 'root' })
export default class LevelService {
  setupLevelsIds(allLevels: Level[]): Level[] {
    let id = 1;
    let [{ levelType: previousLevelType }] = allLevels;
    return cloneDeep(allLevels).map((level: Level) => {
      if (previousLevelType !== level.levelType) {
        id = 1;
        previousLevelType = level.levelType;
      }
      level.id = id++;
      return level;
    });
  }
}
