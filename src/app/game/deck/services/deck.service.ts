import { Injectable } from '@angular/core';

import { attackCard, defenceCard, powerCard } from '../deck.data';
import GameCard from '../models/game-card.model';

@Injectable({ providedIn: 'root' })
export default class DeckService {
  getCards(level: number): GameCard[] {
    // TODO: DeckService: Get cards based on level of progression
    let startingId = 0;
    const cards: GameCard[] = [
      attackCard,
      powerCard,
      defenceCard,
      attackCard,
      powerCard,
      defenceCard,
      attackCard,
      powerCard,
      defenceCard,
    ].map((card) => {
      card = { ...card, id: startingId++ };
      return card;
    });
    return cards;
  }

  getHand(allCards: GameCard[], numberOfCards: number): GameCard[] {
    // TODO: DeckService: Get random cards
    return [...allCards].splice(0, numberOfCards);
  }
}
