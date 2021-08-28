import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../../quiz/store/quiz.actions';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import * as LevelActions from '../../level/store/level.actions';
import * as PlayerActions from '../../player/store/player.actions';
import * as GameActions from '../../store/game.actions';
import DeckService from '../services/deck.service';
import * as DeckActions from '../store/deck.actions';

@Injectable()
export default class DeckEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private deckService: DeckService
  ) {}

  setAllCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LevelActions.chooseLevel),
      switchMap(({ level }) => of(this.deckService.getCards(level.id))),
      map((allCards) => DeckActions.setAllCards({ allCards }))
    )
  );

  startTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.startPlayerTurn),
      withLatestFrom(this.store.select((state) => state.deck)),
      switchMap(([, { allCards, numberOfCards }]) =>
        of(this.deckService.getHand(allCards, numberOfCards))
      ),
      map((hand) => DeckActions.getCardsToHand({ hand }))
    )
  );

  changePhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.changePhase),
      map(() => DeckActions.resetEnergy())
    )
  );

  useCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.useCardOnPlayer, EnemyActions.useCardOnEnemy),
      withLatestFrom(this.store.select((state) => state.deck.chosenCard?.cost)),
      map(([, cost]) => DeckActions.useCard({ cost }))
    )
  );

  increaseEnergyOnCorrectAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.addAnswer),
      // TODO: DeckEffects: Add energy based on number of correct fields
      map(() => DeckActions.changeEnergy({ energy: 1 }))
    )
  );

  decreaseEnergyOnMistake$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.addMistake),
      map(() => DeckActions.changeEnergy({ energy: -1 }))
    )
  );
}
