import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import QuizService from '../../quiz/services/quiz.service';
import * as QuizActions from '../../quiz/store/quiz.actions';
import AppStoreState from '../../store/app.state';
import RADICALS from '../radical.data';
import RadicalService from '../services/radical.service';
import * as RadicalActions from './radical.actions';

@Injectable()
export default class RadicalEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private radicalService: RadicalService,
    private quizService: QuizService
  ) {}

  saveRadicals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadicalActions.saveRadicals),
      switchMap(() => this.radicalService.save(RADICALS)),
      map((radicals) => RadicalActions.setRadicals({ radicals }))
    )
  );

  fetchRadicals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadicalActions.fetchRadicals),
      switchMap(() =>
        this.radicalService
          .getAll()
          .pipe(
            map((radicals) =>
              radicals?.length >= RADICALS.length
                ? RadicalActions.setRadicals({ radicals })
                : RadicalActions.saveRadicals()
            )
          )
      )
    )
  );

  setQuestionsAboutRadicals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadicalActions.setRadicals),
      withLatestFrom(
        this.store.select((state) => state.radical?.radicals),
        this.store.select((state) => state.quiz?.quizOptions),
        this.store.select((state) => state.quiz?.questions)
      ),
      switchMap(([action, radicals, quizOptions, alreadyChosenQuestions]) =>
        of(
          this.quizService.prepareQuestions(
            radicals,
            quizOptions,
            alreadyChosenQuestions
          )
        )
      ),
      map((questions) => QuizActions.setQuestions({ questions }))
    )
  );
}
