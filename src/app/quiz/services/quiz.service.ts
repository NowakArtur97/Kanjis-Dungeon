import { Injectable } from '@angular/core';
import Radical from 'src/app/radical/models/radical.model';

@Injectable({ providedIn: 'root' })
export default class QuizService {
  prepareQuestions = (
    characters: Radical[],
    numberOfQuestions: number
  ): Radical[] => this.getRandomQuestions(characters, numberOfQuestions);

  private getRandomQuestions(
    allQuestions: Radical[],
    numberOfQuestions: number
  ): Radical[] {
    const questions: Radical[] = [];
    if (
      this.isNumberOfQuestionsBiggerThanNumberOfAllQuestions(
        allQuestions.length,
        numberOfQuestions
      )
    ) {
      numberOfQuestions = allQuestions.length;
    }

    while (questions.length < numberOfQuestions) {
      let question =
        allQuestions[Math.floor(Math.random() * allQuestions.length)];
      if (!questions.includes(question)) {
        questions.push(question);
      }
    }

    return questions;
  }

  private isNumberOfQuestionsBiggerThanNumberOfAllQuestions = (
    numberOfAllQuestions: number,
    numberOfQuestions: number
  ) => numberOfAllQuestions < numberOfQuestions;
}
