import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import CharacterUtil from 'src/app/japanese/common/utils/character.util';

import KanjiService from '../../kanji/services/kanji.service';
import * as KanjiActions from '../../kanji/store/kanji.actions';
import * as RadicalActions from '../../radical/store/radical.actions';
import KANJI from '../kanji.data';

@Injectable()
export default class KanjiEffects {
  constructor(private actions$: Actions, private kanjiService: KanjiService) {}

  saveKanji$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanjiActions.saveKanji),
      switchMap(() => this.kanjiService.save(CharacterUtil.setUpIds(KANJI))),
      map((kanji) => KanjiActions.setKanji({ kanji }))
    )
  );

  fetchKanji$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadicalActions.setRadicals),
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
