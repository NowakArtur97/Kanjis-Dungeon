import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import LevelService from '../services/level.service';
import * as LevelActions from './level.actions';

@Injectable()
export default class LevelEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private levelService: LevelService
  ) {}

  // TODO: TEST
  changeTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LevelActions.setupLevels),
      withLatestFrom(this.store.select((state) => state.level?.allLevels)),
      switchMap(([, allLevels]) =>
        of(this.levelService.setupLevelsIds(allLevels))
      ),
      map((allLevels) => LevelActions.setLevels({ allLevels }))
    )
  );
}
