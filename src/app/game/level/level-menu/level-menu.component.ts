import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import AppStoreState from 'src/app/store/app.state';

import * as LevelActions from '../store/level.actions';

@Component({
  selector: 'app-level-menu',
  templateUrl: './level-menu.component.html',
  styleUrls: ['./level-menu.component.css'],
})
export class LevelMenuComponent implements OnInit {
  constructor(private store: Store<AppStoreState>) {}

  //TODO: TEST
  ngOnInit(): void {
    this.store.dispatch(LevelActions.setupLevels());
  }

  //TODO: TEST
  onChoseLevel() {
    const level = 1;
    this.store.dispatch(LevelActions.chooseLevel({ level }));
  }
}
