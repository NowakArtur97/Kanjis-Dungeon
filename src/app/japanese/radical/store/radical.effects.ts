import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import CharacterUtil from 'src/app/common/utils/character.util';

import RADICALS from '../radical.data';
import RadicalService from '../services/radical.service';
import * as RadicalActions from './radical.actions';

@Injectable()
export default class RadicalEffects {
  constructor(
    private actions$: Actions,
    private radicalService: RadicalService
  ) {}

  // TODO: TEST
  saveRadicals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadicalActions.saveRadicals),
      switchMap(() =>
        this.radicalService.save(CharacterUtil.setUpIds(RADICALS))
      ),
      map((radicals) => RadicalActions.setRadicals({ radicals }))
    )
  );

  fetchRadicals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadicalActions.fetchRadicals),
      switchMap(() =>
        this.radicalService
          .getAll()
          .pipe(
            map((radicals) =>
              radicals?.length >= RADICALS.length
                ? RadicalActions.setRadicals({ radicals })
                : RadicalActions.saveRadicals()
            )
          )
      )
    )
  );
}
