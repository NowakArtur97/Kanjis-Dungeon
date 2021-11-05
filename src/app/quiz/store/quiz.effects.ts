import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private quizService: QuizService,
    private router: Router
  ) {}

  private readonly QUIZ_ROUTE = 'quiz';

  // TODO: TEST
  getPreferredQuestionFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.getPreferredQuestionsFromStorage),
      switchMap(() => of(this.quizService.loadPreferredQuestionsFromStorage())),
      map((preferredQuestions) =>
        QuizActions.setPreferredQuestions({ preferredQuestions })
      )
    )
  );

  // TODO: TEST
  addPreferredQuestion$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          QuizActions.addPreferredQuestion,
          QuizActions.removePreferredQuestion
        ),
        withLatestFrom(
          this.store.select((state) => state.quiz.preferredQuestions)
        ),
        switchMap(([, preferredQuestions]) =>
          of(
            this.quizService.savePreferredQuestionsToStorage(preferredQuestions)
          )
        )
      ),
    { dispatch: false }
  );

  setNextQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        QuizActions.setQuestions,
        QuizActions.addAnswer,
        QuizActions.addMistake
      ),
      withLatestFrom(this.store.select((state) => state.quiz.questions)),
      switchMap(([, questions]) =>
        of(this.quizService.getNextQuestion(questions))
      ),
      map((nextQuestion) =>
        nextQuestion === undefined && this.router.url === `/${this.QUIZ_ROUTE}`
          ? QuizActions.showSummary()
          : QuizActions.setNextQuestion({ nextQuestion })
      )
    )
  );

  // TODO: TEST
  setQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        QuizActions.changeQuizOptions,
        QuizActions.repeatQuiz,
        VocabularyActions.setVocabulary
      ),
      withLatestFrom(this.store.select((state) => state.quiz)),
      switchMap(([, { preferredQuestions, quizOptions }]) =>
        of(
          this.quizService.selectFromPrefferedQuestions(
            preferredQuestions,
            quizOptions
          )
        )
      ),
      withLatestFrom(
        this.store.select((state) => state.quiz),
        this.store.select((state) => state.radical.radicals),
        this.store.select((state) => state.kanji.kanji),
        this.store.select((state) => state.vocabulary.vocabulary)
      ),
      switchMap(
        ([
          chosenQuestions,
          { quizOptions, questions },
          radicals,
          kanji,
          vocabulary,
        ]) =>
          of(
            this.quizService.prepareQuestions(radicals, quizOptions, [
              ...chosenQuestions,
              ...questions,
            ])
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
