import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import KanjiService from '../../kanji/services/kanji.service';
import * as KanjiActions from '../../kanji/store/kanji.actions';
import QuizService from '../../quiz/services/quiz.service';
import * as QuizActions from '../../quiz/store/quiz.actions';
import AppStoreState from '../../store/app.state';
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
      ofType(KanjiActions.setKanji, QuizActions.changeQuizOptions),
      withLatestFrom(
        this.store.select((state) => state.kanji?.kanji),
        this.store.select((state) => state.quiz?.quizOptions),
        this.store.select((state) => state.quiz?.questions)
      ),
      switchMap(([action, kanji, quizOptions, alreadyChosenQuestions]) =>
        of(
          this.quizService.prepareQuestions(
            kanji,
            quizOptions,
            alreadyChosenQuestions
          )
        )
      ),
      map((questions) => QuizActions.setQuestions({ questions }))
    )
  );
}
