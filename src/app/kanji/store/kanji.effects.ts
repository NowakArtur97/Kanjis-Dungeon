import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import QuizService from 'src/app/quiz/services/quiz.service';
import AppStoreState from 'src/app/store/app.state';

import KanjiService from '../../kanji/services/kanji.service';
import * as KanjiActions from '../../kanji/store/kanji.actions';
import * as QuizActions from '../../quiz/store/quiz.actions';
import KANJI from '../kanji.data';

@Injectable()
export default class KanjiEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private kanjiService: KanjiService,
    private quizService: QuizService
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

  setQuestionsAboutKanji$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanjiActions.setKanji),
      withLatestFrom(
        this.store.select((state) => state.kanji.kanji),
        this.store.select((state) => state.quiz.maxNumberOfQuestions),
        this.store.select((state) => state.quiz.questions)
      ),
      switchMap(
        ([action, radicals, maxNumberOfQuestions, alreadyChosenQuestions]) =>
          of(
            this.quizService.prepareQuestions(
              radicals,
              maxNumberOfQuestions,
              alreadyChosenQuestions
            )
          )
      ),
      map((questions) => QuizActions.setQuestions({ questions }))
    )
  );
}
