import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import KanjiService from '../../kanji/services/kanji.service';
import * as KanjiActions from '../../kanji/store/kanji.actions';

@Injectable()
export default class KanjiEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private kanjiService: KanjiService
  ) {}

  saveKanji$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanjiActions.saveKanji),
      withLatestFrom(this.store.select((state) => state.kanji.kanji)),
      switchMap(([actions, kanji]) =>
        this.kanjiService.save(kanji).pipe(map(() => KanjiActions.fetchKanji()))
      )
    )
  );
}
