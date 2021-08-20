import { Injectable } from '@angular/core';
import cloneDeep from 'lodash/cloneDeep';
import MathUtil from 'src/app/common/utils/math.util';

import CharacterStatus from '../../character/models/character-status.model';
import Character from '../../character/models/character.model';
import GameCard from '../../deck/models/game-card.model';
import { imp, pigWarrior } from '../enemy.data';

@Injectable({ providedIn: 'root' })
export default class EnemyService {
  private FIRST_ID = 1;

  // TODO: EnemyService: Get random enemies
  chooseEnemies(level: number, allEnemies: Character[]): Character[] {
    const enemiesCopy = [pigWarrior, imp].map((enemytoCopy) =>
      cloneDeep(enemytoCopy)
    );
    const enemies = enemiesCopy.map((enemy) => {
      enemy.id = this.FIRST_ID++;
      return enemy;
    });
    return enemies;
  }

  useCardOnEnemy(
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

  applyStatusesOnEnemies(enemies: Character[]): Character[] {
    return enemies
      .map((enemytoCopy) => cloneDeep(enemytoCopy))
      .map((enemy: Character) => {
        enemy.statuses.forEach((status: CharacterStatus) =>
          status.apply(enemy)
        );
        return enemy;
      })
      .map((enemy) => {
        const enemyCopy = cloneDeep(enemy);
        return {
          ...enemyCopy,
          statuses: enemyCopy.statuses.filter(
            (status: CharacterStatus) =>
              status.remainingNumberOfActiveRounds !== 0
          ),
        };
      });
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
}
