import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import KanjiService from '../../kanji/services/kanji.service';
import * as KanjiActions from '../../kanji/store/kanji.actions';
import KANJI from '../kanji.data';

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
      switchMap(() => this.kanjiService.save(KANJI)),
      map((kanji) => KanjiActions.setKanji({ kanji }))
    )
  );

  fetchKanji$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanjiActions.fetchKanji),
      switchMap(() =>
        this.kanjiService
          .getAll()
          .pipe(
            map((kanji) =>
              kanji?.length >= KANJI?.length
                ? KanjiActions.setKanji({ kanji })
                : KanjiActions.saveKanji()
            )
          )
      )
    )
  );
}
