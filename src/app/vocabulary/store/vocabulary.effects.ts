import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import * as KanjiActions from '../../kanji/store/kanji.actions';
import QuizService from '../../quiz/services/quiz.service';
import AppStoreState from '../../store/app.state';
import VocabularyService from '../services/vocabulary.service';
import VOCABULARY from '../vocabulary.data';
import * as VocabularyActions from './vocabulary.actions';

@Injectable()
export default class VocabularyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private vocabularyService: VocabularyService,
    private quizService: QuizService
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
