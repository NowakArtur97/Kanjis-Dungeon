import { Injectable } from '@angular/core';
import CharacterUtil from 'src/app/common/utils/character.util';
import MathUtil from 'src/app/common/utils/math.util';
import Radical from 'src/app/radical/models/radical.model';

import QuizCard from '../models/quiz-card.model';

@Injectable({ providedIn: 'root' })
export default class QuizService {
  // TODO: Move to Quiz store
  private readonly NUMBER_OF_QUESTIONS_TYPES = 3;

  getNextQuestion = (questions: Radical[]): Radical =>
    questions[MathUtil.getRandomIndex(questions)];

  prepareQuestions = (
    allQuestions: Radical[],
    numberOfQuestions: number,
    alreadyChosenQuestions: Radical[]
  ): Radical[] => {
    const questions: Radical[] = [];
    numberOfQuestions = this.setNumberOfQuestions(
      allQuestions,
      numberOfQuestions,
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

  private setNumberOfQuestions(
    allQuestions: Radical[],
    numberOfQuestions: number,
    alreadyChosenQuestions: Radical[]
  ): number {
    let thisTypeNumberOfQuestions = Math.floor(
      numberOfQuestions / this.NUMBER_OF_QUESTIONS_TYPES
    );

    const questionsLeft =
      numberOfQuestions -
      (alreadyChosenQuestions.length + thisTypeNumberOfQuestions);
    if (questionsLeft < thisTypeNumberOfQuestions) {
      thisTypeNumberOfQuestions += questionsLeft;
    }

    if (allQuestions.length < thisTypeNumberOfQuestions) {
      thisTypeNumberOfQuestions = allQuestions.length;
    }

    return thisTypeNumberOfQuestions;
  }

  choosePropertiesForQuestion(question: Radical): QuizCard {
    const quizCard: QuizCard = this.getDefaultQuizCard(question);

    if (question?.id === undefined) {
      return quizCard;
    }

    // TODO: Move to store
    const minNumberOfProperties = 1;
    const excludedProperties = ['characters', 'type'];

    const properties = Object.getOwnPropertyNames(question).filter(
      (property) =>
        !excludedProperties.includes(property) &&
        quizCard[property] !== undefined
    );

    const numberOfProperties = MathUtil.getRandomIntValue(
      properties.length,
      minNumberOfProperties
    );

    let propertiesCounter = 0;
    while (propertiesCounter < numberOfProperties) {
      const property = properties[MathUtil.getRandomIndex(properties)];

      const isArray = Array.isArray(quizCard[property]);
      properties.splice(properties.indexOf(property), 1);
      quizCard[property] = isArray ? [''] : '';

      propertiesCounter++;
    }

    return quizCard;
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
}
