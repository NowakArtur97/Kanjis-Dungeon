import { Injectable } from '@angular/core';

import Character from '../../character/models/character.model';
import GameCard from '../../deck/models/game-card.model';

@Injectable({ providedIn: 'root' })
export default class PlayerService {
  updatePlayer(gameCard: GameCard, player: Character): Character {
    const updatedPlayer = JSON.parse(JSON.stringify(player));
    gameCard.apply(updatedPlayer);
    return updatedPlayer;
  }
}
