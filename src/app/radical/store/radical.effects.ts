import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import AppStoreState from '../../store/app.state';
import RadicalService from '../services/radical.service';
import * as RadicalsActions from './radical.actions';

@Injectable()
export default class RadicalEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private radicalService: RadicalService
  ) {}

  saveRadicals$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RadicalsActions.saveRadicals),
        withLatestFrom(this.store.select((state) => state.radical.radicals)),
        switchMap(([actions, radicals]) => this.radicalService.save(radicals))
      ),
    { dispatch: false }
  );
}
