import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import GameTurn from '../enums/game-turn.enum';
import * as GameActions from '../store/game.actions';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.css'],
})
export class GameLayoutComponent implements OnInit, OnDestroy {
  private gameTurnSubscription$: Subscription;

  isPlayerTurn: boolean;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    // TODO: GameLayoutComponent: Get level from routing(?)
    const level = 1;
    this.store.dispatch(GameActions.chooseLevel({ level }));

    this.gameTurnSubscription$ = this.store
      .select('game')
      .subscribe(({ turn }) => {
        if (turn !== undefined) {
          this.isPlayerTurn = (turn as GameTurn) === GameTurn.PLAYER_TURN;
        }
      });
  }

  ngOnDestroy(): void {
    this.gameTurnSubscription$?.unsubscribe();
  }
}
