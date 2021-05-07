import { Injectable } from '@angular/core';

import { attackCard, defenceCard, powerCard } from '../deck.data';
import GameCard from '../models/game-card.model';

@Injectable({ providedIn: 'root' })
export default class DeckService {
  getCards(level: number): GameCard[] {
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
