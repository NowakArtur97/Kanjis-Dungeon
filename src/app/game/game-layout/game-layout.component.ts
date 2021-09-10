import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import GamePhase from '../enums/game-phase.enum';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.css'],
})
export class GameLayoutComponent implements OnInit, OnDestroy {
  private gameTurnSubscription$: Subscription;

  isQuizPhase: boolean;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.gameTurnSubscription$ = this.store
      .select('game')
      .subscribe(({ phase }) => {
        if (phase !== undefined) {
          this.isQuizPhase = (phase as GamePhase) === GamePhase.QUIZ;
        }
      });
  }

  ngOnDestroy = (): void => this.gameTurnSubscription$?.unsubscribe();
}
