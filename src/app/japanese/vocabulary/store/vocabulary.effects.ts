import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import * as KanjiActions from '../../kanji/store/kanji.actions';
import VocabularyService from '../services/vocabulary.service';
import VOCABULARY from '../vocabulary.data';
import * as VocabularyActions from './vocabulary.actions';

@Injectable()
export default class VocabularyEffects {
  constructor(
    private actions$: Actions,
    private vocabularyService: VocabularyService
  ) {}

  saveVocabulary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActions.saveVocabulary),
      switchMap(() => this.vocabularyService.save(VOCABULARY)),
      map((vocabulary) => VocabularyActions.setVocabulary({ vocabulary }))
    )
  );

  fetchVocabulary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanjiActions.setKanji),
      switchMap(() =>
        this.vocabularyService
          .getAll()
          .pipe(
            map((vocabulary) =>
              vocabulary?.length >= VOCABULARY.length
                ? VocabularyActions.setVocabulary({ vocabulary })
                : VocabularyActions.saveVocabulary()
            )
          )
      )
    )
  );
}
