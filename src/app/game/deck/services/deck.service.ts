import { Injectable } from '@angular/core';

import Character from '../../character/models/character.model';
import GameCardType from '../enums/game-card-type.enum';
import GameCard from '../models/game-card.model';

@Injectable({ providedIn: 'root' })
export default class DeckService {
  getCards(level: number): GameCard[] {
    // TODO: DeckService: Get cards from some data file
    const attackCard = {
      name: 'Attack',
      cost: 2,
      type: GameCardType.ATTACK,
      description: 'Deal 10 damage points',
      apply(character: Character) {
        character.stats.currentHealth -= 10;
      },
    };
    const defenceCard = {
      name: 'Defence',
      cost: 2,
      type: GameCardType.SKILL,
      description: 'Receive 10 block points',
      apply(character: Character) {
        character.stats.currentShield += 10;
      },
    };
    const powerCard = {
      name: 'Power',
      cost: 2,
      type: GameCardType.POWER,
      description: 'Deal 2 times more damage',
      apply(character: Character) {
        character.stats.damage *= 2;
      },
    };
    // TODO: DeckService: Get cards from some data file
    return [
      attackCard,
      powerCard,
      defenceCard,
      attackCard,
      powerCard,
      defenceCard,
      attackCard,
      powerCard,
      defenceCard,
    ];
  }

  getHand(allCards: GameCard[], numberOfCards: number): GameCard[] {
    // TODO: DeckService: Get random cards
    return [...allCards].splice(0, numberOfCards);
  }
}
