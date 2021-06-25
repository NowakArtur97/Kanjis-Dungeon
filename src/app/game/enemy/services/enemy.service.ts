import { Injectable } from '@angular/core';
import cloneDeep from 'lodash/cloneDeep';
import MathUtil from 'src/app/common/utils/math.util';

import Character from '../../character/models/character.model';
import GameCard from '../../deck/models/game-card.model';
import { exampleEnemy2 } from '../enemy.data';

@Injectable({ providedIn: 'root' })
export default class EnemyService {
  private FIRST_ID = 1;

  // TODO: EnemyService: Get random enemies
  chooseEnemies(level: number, allEnemies: Character[]): Character[] {
    const updatedEnemies = [
      // exampleEnemy1,
      exampleEnemy2,
      // exampleEnemy3,
    ].map((enemytoCopy) => cloneDeep(enemytoCopy));
    const enemies = updatedEnemies.map((enemy) => {
      enemy.id = this.FIRST_ID++;
      return enemy;
    });
    return enemies;
  }

  updateEnemies(
    gameCard: GameCard,
    enemy: Character,
    enemies: Character[]
  ): Character[] {
    const updatedEnemies = enemies.map((enemytoCopy) => cloneDeep(enemytoCopy));
    const enemyToUpdate: Character = updatedEnemies.find(
      (e) => e.id === enemy.id
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

  // TODO: TEST
  performAction(
    enemy: Character,
    player: Character
  ): { enemy: Character; player: Character } {
    const updatedPlayer: Character = JSON.parse(JSON.stringify(player));
    const updatedEnemy: Character = cloneDeep(enemy);
    updatedEnemy.currentAction.apply(updatedEnemy, updatedPlayer);
    updatedEnemy.currentAction = null;

    return { enemy: updatedEnemy, player: updatedPlayer };
  }

  // TODO: TEST
  removeCurrentAction(character: Character, enemies: Character[]): Character {
    const enemyToRemoveAction = cloneDeep(
      enemies.find((enemy) => enemy.id === character.id)
    );
    enemyToRemoveAction.currentAction = null;

    return enemyToRemoveAction;
  }
}
