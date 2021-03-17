import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import AppStoreState from '../../store/app.state';
import RADICALS from '../radical.data';
import RadicalService from '../services/radical.service';
import * as RadicalsActions from './radical.actions';

@Injectable()
export default class RadicalEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private radicalService: RadicalService
  ) {}

  saveRadicals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadicalsActions.saveRadicals),
      switchMap(() => this.radicalService.save(RADICALS)),
      map((radicals) => RadicalsActions.setRadicals({ radicals }))
    )
  );

  fetchRadicals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadicalsActions.fetchRadicals),
      switchMap(() =>
        this.radicalService
          .getAll()
          .pipe(
            map((radicals) =>
              radicals?.length >= RADICALS.length
                ? RadicalsActions.setRadicals({ radicals })
                : RadicalsActions.saveRadicals()
            )
          )
      )
    )
  );
}
