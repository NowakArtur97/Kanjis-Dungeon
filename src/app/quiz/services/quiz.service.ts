import { Injectable } from '@angular/core';
import Radical from 'src/app/radical/models/radical.model';

@Injectable({ providedIn: 'root' })
export default class QuizService {
  //TODO: Move to Quiz store
  private readonly NUMBER_OF_QUESTIONS_TYPES = 3;

  prepareQuestions = (
    characters: Radical[],
    numberOfQuestions: number,
    alreadyChosenQuestions: Radical[]
  ): Radical[] =>
    this.getRandomQuestions(
      characters,
      numberOfQuestions,
      alreadyChosenQuestions
    );

  private getRandomQuestions(
    allQuestions: Radical[],
    numberOfQuestions: number,
    alreadyChosenQuestions: Radical[]
  ): Radical[] {
    const questions: Radical[] = [];
    numberOfQuestions = this.setNumberOfQuestions(
      allQuestions,
      numberOfQuestions,
      alreadyChosenQuestions
    );
    while (questions.length < numberOfQuestions) {
      let question =
        allQuestions[Math.floor(Math.random() * allQuestions.length)];
      if (!questions.includes(question)) {
        questions.push(question);
      }
    }

    return [...alreadyChosenQuestions, ...questions];
  }

  private setNumberOfQuestions(
    allQuestions: Radical[],
    numberOfQuestions: number,
    alreadyChosenQuestions: Radical[]
  ): number {
    let thisTypeNumberOfQuestions = Math.floor(
      numberOfQuestions / this.NUMBER_OF_QUESTIONS_TYPES
    );
    console.log(thisTypeNumberOfQuestions);

    const questionsLeft =
      numberOfQuestions -
      (alreadyChosenQuestions.length + thisTypeNumberOfQuestions);
    if (questionsLeft <= thisTypeNumberOfQuestions) {
      thisTypeNumberOfQuestions += questionsLeft;
    }
    console.log(questionsLeft);
    if (allQuestions.length < thisTypeNumberOfQuestions) {
      thisTypeNumberOfQuestions = allQuestions.length;
    }
    console.log('****************');

    return thisTypeNumberOfQuestions;
  }
}
