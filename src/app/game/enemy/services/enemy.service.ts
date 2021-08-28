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
  chooseEnemies(enemies: Character[]): Character[] {
    let id = 1;
    return cloneDeep(enemies).map((enemy: Character) => {
      enemy.id = id++;
      return enemy;
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
    const updatedEnemies = cloneDeep(enemies);
    const enemyToUpdate: Character = updatedEnemies.find(
      (e: Character) => e.id === enemy.id
    );

    gameCard.apply(enemyToUpdate);

    return updatedEnemies;
  }

  applyStatusesOnEnemies = (enemies: Character[]): Character[] =>
    cloneDeep(enemies)
      .map((enemy: Character) => {
        enemy.statuses.forEach((status: CharacterStatus) =>
          status.apply(enemy)
        );
        return enemy;
      })
      .map((enemy: Character) => {
        const enemyCopy = cloneDeep(enemy);
        return {
          ...enemyCopy,
          statuses: enemyCopy.statuses.filter(
            (status: CharacterStatus) =>
              status.remainingNumberOfActiveRounds !== 0
          ),
        };
      });

  // TODO: TEST
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
