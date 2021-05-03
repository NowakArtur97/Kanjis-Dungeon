import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import Character from '../../character/models/character.model';

@Component({
  selector: 'app-player-layout',
  templateUrl: './player-layout.component.html',
  styleUrls: ['./player-layout.component.css'],
})
export class PlayerLayoutComponent implements OnInit, OnDestroy {
  private playerSubscription$: Subscription;
  player: Character;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.playerSubscription$ = this.store
      .select('player')
      .subscribe(({ player }) => {
        if (player) {
          this.player = player;
        }
      });
  }

  ngOnDestroy(): void {
    this.playerSubscription$?.unsubscribe();
  }
}
