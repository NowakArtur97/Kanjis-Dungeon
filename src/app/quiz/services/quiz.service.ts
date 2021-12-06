import { Injectable } from '@angular/core';
import MathUtil from 'src/app/common/utils/math.util';
import Level from 'src/app/game/level/models/level.model';
import CharacterUtil from 'src/app/japanese/common/utils/character.util';
import Radical from 'src/app/japanese/radical/models/radical.model';

import QuizCard from '../models/quiz-card.model';
import QuizOptions from '../models/quiz-options.model';

@Injectable({ providedIn: 'root' })
export default class QuizService {
  private readonly PREFFERED_QUESTIONS_KEY = 'PREFFERED_QUESTIONS';
  private readonly QUESTIONS_KEY = 'QUESTIONS';
  private readonly ANSWERS_KEY = 'ANSWERS';
  private readonly MISTAKES_KEY = 'MISTAKES';
  private readonly QUIZ_OPTIONS_KEY = 'QUIZ_OPTIONS';
  private readonly MIN_NUMBER_OF_QUESTION = 1;

  getNextQuestion = (questions: Radical[]): Radical =>
    questions[MathUtil.getRandomIndex(questions)];

  selectFromPrefferedQuestions(
    prefferedQuestions: Radical[],
    quizOptions: QuizOptions,
    level: Level = null
  ): Radical[] {
    if (level) {
      return [];
    }

    const chosenQuestions: Radical[] = [];
    const preferredNotExcludedQuestions: Radical[] = prefferedQuestions.filter(
      (question) => !this.isTypeExcluded(quizOptions, question)
    );
    const prefferedQuestionsLength = preferredNotExcludedQuestions.length;
    const { numberOfQuestions } = quizOptions;
    while (
      chosenQuestions.length < prefferedQuestionsLength &&
      chosenQuestions.length < numberOfQuestions
    ) {
      const question =
        preferredNotExcludedQuestions[
          MathUtil.getRandomIndex(preferredNotExcludedQuestions)
        ];
      if (!chosenQuestions.includes(question)) {
        chosenQuestions.push(question);
      }
    }
    return chosenQuestions;
  }

  prepareQuestions = (
    allQuestions: Radical[],
    quizOptions: QuizOptions,
    alreadyChosenQuestions: Radical[]
  ): Radical[] => {
    if (this.isTypeExcluded(quizOptions, allQuestions[0])) {
      return alreadyChosenQuestions;
    }

    const questions: Radical[] = [];
    const numberOfQuestions = this.setNumberOfQuestions(
      allQuestions,
      quizOptions,
      alreadyChosenQuestions
    );

    while (questions.length < numberOfQuestions) {
      const question = allQuestions[MathUtil.getRandomIndex(allQuestions)];
      if (!questions.includes(question)) {
        questions.push(question);
      }
    }

    return [...alreadyChosenQuestions, ...questions];
  };

  private isTypeExcluded = (
    quizOptions: QuizOptions,
    question: Radical
  ): boolean => !quizOptions.questionTypes.includes(question.type);

  private setNumberOfQuestions(
    allQuestions: Radical[],
    quizOptions: QuizOptions,
    alreadyChosenQuestions: Radical[]
  ): number {
    const numberOfAlreadyChosenQuestionsOfThisType = alreadyChosenQuestions.filter(
      (question) => question.type === allQuestions[0].type
    ).length;
    let thisTypeNumberOfQuestions =
      Math.floor(
        quizOptions.numberOfQuestions / quizOptions.questionTypes.length
      ) - numberOfAlreadyChosenQuestionsOfThisType ||
      this.MIN_NUMBER_OF_QUESTION;

    const questionsLeft =
      quizOptions.numberOfQuestions -
      (alreadyChosenQuestions.length + thisTypeNumberOfQuestions);
    if (questionsLeft < thisTypeNumberOfQuestions) {
      thisTypeNumberOfQuestions += questionsLeft;
    }

    if (allQuestions.length < thisTypeNumberOfQuestions) {
      thisTypeNumberOfQuestions = allQuestions.length;
    }

    return thisTypeNumberOfQuestions;
  }

  choosePropertiesForQuestion(
    question: Radical,
    quizOptions: QuizOptions
  ): QuizCard {
    const quizCard: QuizCard = this.getDefaultQuizCard(question);

    if (!question) {
      return quizCard;
    }

    const excludedProperties = quizOptions.excludedProperties.get(
      question.type
    );
    const properties = this.getPropertiesToHide(
      question,
      excludedProperties,
      quizCard
    );
    const numberOfProperties = this.getNumberOfPropertiesToHide(
      properties,
      quizOptions
    );

    let propertiesCounter = 0;
    while (propertiesCounter < numberOfProperties) {
      this.hideProperty(properties, quizCard);
      propertiesCounter++;
    }

    return quizCard;
  }

  private hideProperty(properties: string[], quizCard: QuizCard): void {
    const property = properties[MathUtil.getRandomIndex(properties)];
    const isArray = Array.isArray(quizCard[property]);
    properties.splice(properties.indexOf(property), 1);
    quizCard[property] = isArray ? [''] : '';
  }

  private getDefaultQuizCard(question: Radical): QuizCard {
    return {
      characters: question?.characters ? question.characters : '',
      meanings: question?.meanings ? question.meanings : [''],
      onyomi:
        CharacterUtil.isKanji(question) && question.onyomi
          ? question.onyomi
          : [''],
      kunyomi:
        CharacterUtil.isKanji(question) && question.kunyomi
          ? question.kunyomi
          : [''],
      nanori:
        CharacterUtil.isKanji(question) && question.nanori
          ? question.nanori
          : [''],
      reading:
        CharacterUtil.isVocabulary(question) && question.reading
          ? question.reading
          : '',
    };
  }

  private getPropertiesToHide = (
    question: Radical,
    excludedProperties: string[],
    quizCard: QuizCard
  ) =>
    Object.getOwnPropertyNames(question).filter(
      (property) =>
        !excludedProperties.includes(property) &&
        quizCard[property] !== undefined
    );

  private getNumberOfPropertiesToHide(
    properties: string[],
    quizOptions: QuizOptions
  ): number {
    if (!quizOptions.shouldHideRandomProperties) {
      return properties.length;
    } else if (properties.length === 1) {
      return 1;
    }
    return MathUtil.getRandomIntValue(
      properties.length,
      quizOptions.minNumberOfProperties
    );
  }

  savePreferredQuestionsToStorage = (prefferedQuestions: Radical[]): void =>
    localStorage.setItem(
      this.PREFFERED_QUESTIONS_KEY,
      JSON.stringify(prefferedQuestions)
    );

  loadPreferredQuestionsFromStorage = (): Radical[] =>
    JSON.parse(localStorage.getItem(this.PREFFERED_QUESTIONS_KEY)) || [];

  saveQuizProgress(
    questions: Radical[],
    answers: Radical[],
    mistakes: Radical[],
    quizOptions: QuizOptions
  ): void {
    localStorage.setItem(this.QUESTIONS_KEY, JSON.stringify(questions));
    localStorage.setItem(this.ANSWERS_KEY, JSON.stringify(answers));
    localStorage.setItem(this.MISTAKES_KEY, JSON.stringify(mistakes));
    localStorage.setItem(this.QUIZ_OPTIONS_KEY, JSON.stringify(quizOptions));
  }
}
