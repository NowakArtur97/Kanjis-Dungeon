import { Injectable } from '@angular/core';

import Character from '../../character/models/character.model';
import GameCard from '../../deck/models/game-card.model';
import { exampleEnemy1, exampleEnemy2, exampleEnemy3 } from '../enemy.data';

@Injectable({ providedIn: 'root' })
export default class EnemyService {
  // TODO: EnemyService: Get random enemies
  chooseEnemies(level: number): Character[] {
    return [exampleEnemy1, exampleEnemy2, exampleEnemy3];
  }

  updateEnemies(
    gameCard: GameCard,
    enemy: Character,
    enemies: Character[]
  ): Character[] {
    const updatedEnemies = enemies.map((enemytoCopy) =>
      JSON.parse(JSON.stringify(enemytoCopy))
    );
    const enemyToUpdate = updatedEnemies.find(
      (e) => JSON.stringify(e) === JSON.stringify(enemy)
    );
    gameCard.apply(enemyToUpdate);
    return updatedEnemies;
  }

  chooseRandomEnemiesActions(enemies: Character[]): Character[] {
    const updatedEnemies = enemies.map((enemytoCopy) =>
      JSON.parse(JSON.stringify(enemytoCopy))
    );
    return updatedEnemies;
  }
}
