import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import CharacterUtil from 'src/app/japanese/common/utils/character.util';

import * as KanjiActions from '../../kanji/store/kanji.actions';
import Word from '../models/word.model';
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
      switchMap(() =>
        this.vocabularyService.save(
          CharacterUtil.setUpIds(VOCABULARY) as Word[]
        )
      ),
      map((vocabulary) => VocabularyActions.setVocabulary({ vocabulary }))
    )
  );

  fetchVocabulary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanjiActions.setKanji),
      switchMap(() =>
        this.vocabularyService.getAll().pipe(
          map((vocabulary) =>
            vocabulary?.length >= VOCABULARY.length
              ? VocabularyActions.setVocabulary({ vocabulary })
              : VocabularyActions.saveVocabulary()
          ),
          catchError(() =>
            of(VocabularyActions.setVocabulary({ vocabulary: VOCABULARY }))
          )
        )
      )
    )
  );
}
