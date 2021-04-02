import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import QuizService from '../../quiz/services/quiz.service';
import * as QuizActions from '../../quiz/store/quiz.actions';
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
      ofType(VocabularyActions.fetchVocabulary),
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

  setQuestionsAboutVocabulary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActions.setVocabulary),
      withLatestFrom(
        this.store.select((state) => state.vocabulary?.vocabulary),
        this.store.select((state) => state.quiz?.quizOptions),
        this.store.select((state) => state.quiz?.questions)
      ),
      switchMap(([action, vocabulary, quizOptions, alreadyChosenQuestions]) =>
        of(
          this.quizService.prepareQuestions(
            vocabulary,
            quizOptions,
            alreadyChosenQuestions
          )
        )
      ),
      map((questions) => QuizActions.setQuestions({ questions }))
    )
  );
}
