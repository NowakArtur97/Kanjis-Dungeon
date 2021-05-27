import { Injectable } from '@angular/core';
import cloneDeep from 'lodash/cloneDeep';
import MathUtil from 'src/app/common/utils/math.util';

import Character from '../../character/models/character.model';
import GameCard from '../../deck/models/game-card.model';
import { exampleEnemy1, exampleEnemy2, exampleEnemy3 } from '../enemy.data';

@Injectable({ providedIn: 'root' })
export default class EnemyService {
  // TODO: EnemyService: Get random enemies
  chooseEnemies(level: number, allEnemies: Character[]): Character[] {
    return [exampleEnemy1, exampleEnemy2, exampleEnemy3];
  }

  updateEnemies(
    gameCard: GameCard,
    enemy: Character,
    enemies: Character[]
  ): Character[] {
    const areEqual = (enemy1, enemy2) =>
      JSON.stringify(enemy1) === JSON.stringify(enemy2);
    const updatedEnemies = enemies.map((enemytoCopy) => cloneDeep(enemytoCopy));
    const enemyToUpdate: Character = updatedEnemies.find((e) =>
      areEqual(e, enemy)
    );

    gameCard.apply(enemyToUpdate);

    return updatedEnemies;
  }

  chooseRandomEnemiesActions(enemies: Character[]): Character[] {
    const updatedEnemies = enemies
      .map((enemytoCopy) => cloneDeep(enemytoCopy))
      .map((enemy: Character) => {
        enemy.currentAction =
          enemy.allActions[MathUtil.getRandomIndex(enemy.allActions)];
        return enemy;
      });

    return updatedEnemies;
  }

  // TODO: to test
  performActions(
    enemies: Character[],
    player: Character
  ): { enemies: Character[]; player: Character } {
    const updatedPlayer = JSON.parse(JSON.stringify(player));
    const updatedEnemies = enemies
      .map((enemytoCopy) => cloneDeep(enemytoCopy))
      .map((enemy: Character) => {
        enemy.currentAction.apply(enemy, updatedPlayer);
        return enemy;
      });

    return { enemies: updatedEnemies, player: updatedPlayer };
  }
}
