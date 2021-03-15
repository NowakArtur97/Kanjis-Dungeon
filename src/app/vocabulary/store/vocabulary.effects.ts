import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import VocabularyService from '../services/vocabulary.service';
import VOCABULARY from '../vocabulary.data';
import * as VocabularyActions from './vocabulary.actions';

@Injectable()
export default class VocabularyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private vocabularyService: VocabularyService
  ) {}

  saveVocabulary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActions.saveVocabulary),
      withLatestFrom(this.store.select((state) => state.vocabulary.vocabulary)),
      switchMap(([actions, vocabulary]) =>
        this.vocabularyService.save(vocabulary)
      ),
      map((vocabulary) => VocabularyActions.setVocabulary({ vocabulary }))
    )
  );

  fetchVocabulary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActions.fetchVocabulary),
      switchMap(() =>
        this.vocabularyService
          .getAll()
          .pipe(
            map((vocabulary) =>
              vocabulary?.length >= VOCABULARY?.length
                ? VocabularyActions.setVocabulary({ vocabulary })
                : VocabularyActions.saveVocabulary()
            )
          )
      )
    )
  );
}
