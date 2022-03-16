import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

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

  private readonly QUIZ_ROUTE = '/quiz';

  getPreferredQuestionFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.getDataFromStorage),
      switchMap(() => of(this.quizService.loadPreferredQuestionsFromStorage())),
      map((preferredQuestions) =>
        QuizActions.setPreferredQuestions({ preferredQuestions })
      )
    )
  );

  savePreferredQuestions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          QuizActions.addPreferredQuestion,
          QuizActions.addPreferredQuestions,
          QuizActions.removePreferredQuestion,
          QuizActions.removePreferredQuestions
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

  getQuizProgresFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.getDataFromStorage),
      switchMap(() => of(this.quizService.loadQuizProgressFromStorage())),
      switchMap(({ questions, answers, mistakes, quizOptions }) => [
        QuizActions.setQuizProgress({
          questions,
          answers,
          mistakes,
          quizOptions,
        }),
      ])
    )
  );

  saveQuizProgress$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          QuizActions.setNextQuestion,
          QuizActions.setQuestions,
          QuizActions.repeatQuiz
        ),
        withLatestFrom(this.store.select((state) => state.quiz)),
        switchMap(([, { questions, answers, mistakes, quizOptions }]) =>
          of(
            this.quizService.saveQuizProgressToStorage(
              questions,
              answers,
              mistakes,
              quizOptions
            )
          )
        )
      ),
    { dispatch: false }
  );

  cleanQuizProgres$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(QuizActions.showSummary),
        switchMap(() => of(this.quizService.cleanQuizProgressInStorage()))
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
      withLatestFrom(this.store.select((state) => state.quiz)),
      filter(
        ([, { answers, questions }]) =>
          questions.length > 0 || answers.length > 0
      ),
      switchMap(([, { questions }]) =>
        of(this.quizService.getNextQuestion(questions))
      ),
      map((nextQuestion) =>
        nextQuestion === undefined && this.router.url === this.QUIZ_ROUTE
          ? QuizActions.showSummary()
          : QuizActions.setNextQuestion({ nextQuestion })
      )
    )
  );

  setQuestionsOnApplicationStartup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActions.setVocabulary),
      withLatestFrom(
        this.store.select((state) => state.quiz),
        this.store.select((state) => state.radical.radicals),
        this.store.select((state) => state.kanji.kanji),
        this.store.select((state) => state.vocabulary.vocabulary),
        this.store.select((state) => state.level.level)
      ),
      switchMap(
        ([
          ,
          { quizOptions, questions, answers, mistakes, preferredQuestions },
          radicals,
          kanji,
          vocabulary,
          level,
        ]) => {
          console.log(preferredQuestions.length);
          const hasNotFinishedQuiz = answers.length > 0 || mistakes.length > 0;
          console.log(hasNotFinishedQuiz);
          if (hasNotFinishedQuiz) {
            return of(questions);
          } else {
            const chosenQuestions = this.quizService.selectFromPrefferedQuestions(
              preferredQuestions,
              quizOptions,
              level
            );
            return of(
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
              ),
              mergeMap((mergeQuestions1) => mergeQuestions1),
              mergeMap((mergeQuestions2) => mergeQuestions2)
            );
          }
        }
      ),
      map((questions) => QuizActions.setQuestions({ questions }))
    )
  );

  setQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.changeQuizOptions),
      withLatestFrom(
        this.store.select((state) => state.quiz),
        this.store.select((state) => state.level.level)
      ),
      switchMap(([, { preferredQuestions, quizOptions }, level]) =>
        of(
          this.quizService.selectFromPrefferedQuestions(
            preferredQuestions,
            quizOptions,
            level
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
            ),
            mergeMap((mergeQuestions1) => mergeQuestions1),
            mergeMap((mergeQuestions2) => mergeQuestions2)
          )
      ),
      map((questions) => QuizActions.setQuestions({ questions }))
    )
  );
}
