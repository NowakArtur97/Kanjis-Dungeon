import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import VocabularyService from '../services/vocabulary.service';
import * as VocabularyActions from './vocabulary.actions';

@Injectable()
export default class VocabularyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private vocabularyService: VocabularyService
  ) {}

  saveVocabulary$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(VocabularyActions.saveVocabulary),
        withLatestFrom(
          this.store.select((state) => state.vocabulary.vocabulary)
        ),
        switchMap(([actions, vocabulary]) =>
          this.vocabularyService.save(vocabulary)
        )
      ),
    { dispatch: false }
  );
}
