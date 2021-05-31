import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import * as VocabularyActions from '../../japanese/vocabulary/store/vocabulary.actions';
import AppStoreState from '../../store/app.state';
import QuizService from '../services/quiz.service';
import * as QuizActions from './quiz.actions';

@Injectable()
export default class QuizEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private quizService: QuizService
  ) {}

  setNextQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        QuizActions.setQuestions,
        QuizActions.addAnswer,
        QuizActions.addMistake
      ),
      withLatestFrom(this.store.select((state) => state.quiz?.questions)),
      switchMap(([, questions]) =>
        of(this.quizService.getNextQuestion(questions))
      ),
      map((nextQuestion) => QuizActions.setNextQuestion({ nextQuestion }))
    )
  );

  setQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.changeQuizOptions, VocabularyActions.setVocabulary),
      withLatestFrom(
        this.store.select((state) => state.quiz?.quizOptions),
        this.store.select((state) => state.quiz?.questions),
        this.store.select((state) => state.radical?.radicals),
        this.store.select((state) => state.kanji?.kanji),
        this.store.select((state) => state.vocabulary?.vocabulary)
      ),
      switchMap(([, quizOptions, questions, radicals, kanji, vocabulary]) =>
        of(
          this.quizService.prepareQuestions(radicals, quizOptions, questions)
        ).pipe(
          map((questionsFromRadicals) =>
            of(
              this.quizService.prepareQuestions(
                kanji,
                quizOptions,
                questionsFromRadicals
              )
            ).pipe(
              map((questionsFromRadicalsAndKanji) =>
                of(
                  this.quizService.prepareQuestions(
                    vocabulary,
                    quizOptions,
                    questionsFromRadicalsAndKanji
                  )
                )
              )
            )
          )
        )
      ),
      mergeMap((questions) => questions),
      mergeMap((questions) => questions),
      map((questions) => QuizActions.setQuestions({ questions }))
    )
  );
}
