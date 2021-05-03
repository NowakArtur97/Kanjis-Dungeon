import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import AppStoreState from 'src/app/store/app.state';

import * as GameActions from '../store/game.actions';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.css'],
})
export class GameLayoutComponent implements OnInit {
  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    // TODO: GameLayoutComponent: Get level from routing(?)
    const level = 1;
    this.store.dispatch(GameActions.chooseLevel({ level }));
  }
}
