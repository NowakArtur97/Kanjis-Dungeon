import { Injectable } from '@angular/core';

import GameCardType from '../enums/game-card-type.enum';
import GameCard from '../models/game-card.model';

@Injectable({ providedIn: 'root' })
export default class DeckService {
  getCards(level: number): GameCard[] {
    // TODO: DeckService: Get cards from some data file
    return [
      {
        name: 'Attack',
        cost: 2,
        type: GameCardType.ATTACK,
        description: 'attack',
      },
      {
        name: 'Defence',
        cost: 2,
        type: GameCardType.SKILL,
        description: 'defence',
      },
      {
        name: 'Power',
        cost: 2,
        type: GameCardType.POWER,
        description: 'power',
      },
      {
        name: 'Attack',
        cost: 2,
        type: GameCardType.ATTACK,
        description: 'attack',
      },
      {
        name: 'Defence',
        cost: 2,
        type: GameCardType.SKILL,
        description: 'defence',
      },
      {
        name: 'Power',
        cost: 2,
        type: GameCardType.POWER,
        description: 'power',
      },
      {
        name: 'Attack',
        cost: 2,
        type: GameCardType.ATTACK,
        description: 'attack',
      },
      {
        name: 'Defence',
        cost: 2,
        type: GameCardType.SKILL,
        description: 'defence',
      },
      {
        name: 'Power',
        cost: 2,
        type: GameCardType.POWER,
        description: 'power',
      },
    ];
  }

  getHand(allCards: GameCard[], numberOfCards: number): GameCard[] {
    // TODO: DeckService: Get random cards
    return [...allCards].splice(0, numberOfCards);
  }
}
