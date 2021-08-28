import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import COLORS from 'src/app/common/color.data';
import AppStoreState from 'src/app/store/app.state';

import LevelType from '../enums/level-type.enum';
import Level from '../models/level.model';
import * as LevelActions from '../store/level.actions';

@Component({
  selector: 'app-level-menu',
  templateUrl: './level-menu.component.html',
  styleUrls: ['./level-menu.component.css'],
})
export class LevelMenuComponent implements OnInit, OnDestroy {
  private allLevelsSubscription$: Subscription;

  allRadicalLevels: Level[] = [];
  allKanjiLevels: Level[] = [];
  allVocabularyLevels: Level[] = [];
  allMixLevels: Level[] = [];

  color = COLORS;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.store.dispatch(LevelActions.setupLevels());

    this.allLevelsSubscription$ = this.store
      .select('level')
      .subscribe(({ allLevels }) => this.prepareLevels(allLevels));
  }

  ngOnDestroy = (): void => this.allLevelsSubscription$.unsubscribe();

  onChoseLevel = (level: Level): void =>
    this.store.dispatch(LevelActions.chooseLevel({ level }));

  private prepareLevels(allLevels: Level[]): void {
    allLevels.forEach((level) => {
      const { levelType } = level;
      if (levelType === LevelType.RADICAL) {
        this.allRadicalLevels.push(level);
      } else if (levelType === LevelType.KANJI) {
        this.allKanjiLevels.push(level);
      } else if (levelType === LevelType.VOCABULARY) {
        this.allVocabularyLevels.push(level);
      } else {
        this.allMixLevels.push(level);
      }
    });
  }
}
