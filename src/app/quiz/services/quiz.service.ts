import { Injectable } from '@angular/core';
import CharacterUtil from 'src/app/common/utils/character.util';
import MathUtil from 'src/app/common/utils/math.util';
import Radical from 'src/app/radical/models/radical.model';

import QuizCard from '../models/quiz-card.model';
import QuizOptions from '../models/quiz-options.model';

@Injectable({ providedIn: 'root' })
export default class QuizService {
  getNextQuestion = (questions: Radical[]): Radical =>
    questions[MathUtil.getRandomIndex(questions)];

  prepareQuestions = (
    allQuestions: Radical[],
    quizOptions: QuizOptions,
    alreadyChosenQuestions: Radical[]
  ): Radical[] => {
    if (this.isTypeExcluded(quizOptions, allQuestions)) {
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
    allQuestions: Radical[]
  ): boolean => !quizOptions.questionTypes.includes(allQuestions[0].type);

  private setNumberOfQuestions(
    allQuestions: Radical[],
    quizOptions: QuizOptions,
    alreadyChosenQuestions: Radical[]
  ): number {
    let thisTypeNumberOfQuestions = Math.floor(
      quizOptions.numberOfQuestions / quizOptions.questionTypes.length
    );

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

    if (question?.id === undefined) {
      return quizCard;
    }

    const excludedProperties = quizOptions.excludedProperties.get(
      question.type
    );
    const properties = this.getRandomPropertiesToHide(
      question,
      excludedProperties,
      quizCard
    );
    const numberOfProperties = this.getNumberOfPropertiesToHide(
      properties,
      excludedProperties,
      quizOptions
    );

    let propertiesCounter = 0;
    while (propertiesCounter < numberOfProperties) {
      this.hideProperty(properties, quizCard);

      propertiesCounter++;
    }

    return quizCard;
  }

  private hideProperty(properties: string[], quizCard: QuizCard) {
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

  private getRandomPropertiesToHide = (
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
    excludedProperties: string[],
    quizOptions: QuizOptions
  ) {
    if (properties.length === 1) {
      return 1;
    } else if (properties.length === excludedProperties.length) {
      return properties.length;
    }
    return MathUtil.getRandomIntValue(
      properties.length,
      quizOptions.minNumberOfProperties
    );
  }
}
