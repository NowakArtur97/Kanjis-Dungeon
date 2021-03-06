import { Injectable } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';
import MathUtil from 'src/app/common/utils/math.util';

import { stunnedAction } from '../../character/character-action/character-action.data';
import CharacterActionType from '../../character/enums/character-action-type.enum';
import CharacterStatusType from '../../character/enums/character-status-type.enum';
import CharacterStatus from '../../character/models/character-status.model';
import Character from '../../character/models/character.model';
import GameCard from '../../deck/models/game-card.model';

@Injectable({ providedIn: 'root' })
export default class EnemyService {
  setupEnemies(enemies: Character[]): Character[] {
    let id = 1;
    return cloneDeep(enemies).map((enemy: Character) => {
      return { ...enemy, id: id++ };
    });
  }

  chooseFirstEnemyForAction = (enemies: Character[]): Character =>
    enemies.find(this.isNotStunned);

  chooseEnemyForAction = (
    enemies: Character[],
    character: Character
  ): Character =>
    enemies.find(
      (enemy) =>
        enemy.currentAction !== null &&
        enemy.id !== character.id &&
        this.isNotStunned(enemy)
    );

  private isNotStunned = (enemy: Character): boolean =>
    enemy.currentAction.type !== CharacterActionType.NOTHING;

  useCardOnEnemy(
    gameCard: GameCard,
    enemy: Character,
    enemies: Character[]
  ): Character[] {
    const updatedEnemies: Character[] = [...enemies];
    const enemyToUpdateIndex = enemies.findIndex(
      (e: Character) => e.id === enemy.id
    );

    const enemyToUpdate = cloneDeep(updatedEnemies[enemyToUpdateIndex]);
    gameCard.apply(enemyToUpdate);

    updatedEnemies[enemyToUpdateIndex] = enemyToUpdate;
    return updatedEnemies;
  }

  applyStatusesOnEnemies = (enemies: Character[]): Character[] =>
    enemies
      .map((enemy: Character) => cloneDeep(enemy))
      .map((enemy: Character) => {
        enemy.statuses.forEach((status: CharacterStatus) =>
          status.apply(enemy)
        );
        return enemy;
      })
      .map((enemy: Character) => {
        return {
          ...enemy,
          statuses: enemy.statuses.filter(
            (status: CharacterStatus) =>
              status.remainingNumberOfActiveRounds > 0
          ),
        };
      });

  chooseRandomEnemiesActions(enemies: Character[]): Character[] {
    const updatedEnemies = cloneDeep(enemies).map((enemy: Character) => {
      const { statuses } = enemy;
      const isStunned = statuses.some(
        (action) => action.type === CharacterStatusType.STUNNED
      );

      enemy.currentAction = isStunned
        ? stunnedAction
        : enemy.allActions[MathUtil.getRandomIndex(enemy.allActions)];
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
