import CharacterType from 'src/app/common/enums/character-type.enum';
import Kanji from 'src/app/kanji/models/kanji.model';
import Radical from 'src/app/radical/models/radical.model';
import Word from 'src/app/vocabulary/models/word.model';

import * as QuizActions from '../quiz.actions';
import { quizReducer, QuizStoreState } from '../quiz.reducer';

const radical: Radical = {
  id: 1,
  characters: '一',
  meanings: ['ground'],
  type: CharacterType.RADICAL,
};
const kanji: Kanji = {
  id: 1,
  characters: '上',
  meanings: ['above', 'up', 'over'],
  onyomi: ['じょう'],
  kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
  type: CharacterType.KANJI,
};
const word: Word = {
  id: 1,
  characters: '大人',
  meanings: ['adult', 'mature'],
  reading: 'おとな',
  type: CharacterType.VOCABULARY,
};
const questions = [radical, kanji, word];
const initialState: QuizStoreState = {
  maxNumberOfQuestions: 12,
  nextQuestion: null,
  questions: [],
  answers: [],
  mistakes: [],
};
const stateWithQuestions: QuizStoreState = {
  maxNumberOfQuestions: 12,
  nextQuestion: null,
  questions,
  answers: [],
  mistakes: [],
};
const stateWithMistakes: QuizStoreState = {
  maxNumberOfQuestions: 12,
  nextQuestion: null,
  questions,
  answers: [],
  mistakes: questions,
};

describe('quizReducer', () => {
  describe('QuizActions.setQuiz', () => {
    it('should store questions', () => {
      const action = QuizActions.setQuestions({ questions });
      const actualState = quizReducer(initialState, action);
      const expectedState = { ...stateWithQuestions };

      expect(actualState).toEqual(expectedState);
      expect(actualState.questions[0]).toEqual(radical);
      expect(actualState.questions[1]).toEqual(kanji);
      expect(actualState.questions[2]).toEqual(word);
      expect(actualState.questions.length).toBe(3);
    });

    it('should store empty questions list', () => {
      const emptyQuizList = [];
      const action = QuizActions.setQuestions({ questions: emptyQuizList });
      const actualState = quizReducer(initialState, action);
      const expectedState = { ...initialState };

      expect(actualState).toEqual(expectedState);
      expect(actualState.questions[0]).not.toEqual(radical);
      expect(actualState.questions[1]).not.toEqual(kanji);
      expect(actualState.questions[2]).not.toEqual(word);
      expect(actualState.questions.length).toBe(0);
    });
  });

  describe('QuizActions.setNextQuestion', () => {
    it('should set next question', () => {
      const stateWithNextQuestion: QuizStoreState = {
        maxNumberOfQuestions: 12,
        nextQuestion: radical,
        questions,
        answers: [],
        mistakes: [],
      };
      const action = QuizActions.setNextQuestion({ nextQuestion: radical });
      const actualState = quizReducer(stateWithQuestions, action);
      const expectedState = { ...stateWithNextQuestion };

      expect(actualState).toEqual(expectedState);
      expect(actualState.nextQuestion).toEqual(radical);
    });
  });

  describe('QuizActions.addAnswer', () => {
    it('should add answer', () => {
      const stateWithAnswer: QuizStoreState = {
        maxNumberOfQuestions: 12,
        nextQuestion: null,
        questions: [kanji, word],
        answers: [radical],
        mistakes: [],
      };
      const action = QuizActions.addAnswer({ answer: radical });
      const actualState = quizReducer(stateWithQuestions, action);
      const expectedState = { ...stateWithAnswer };

      expect(actualState).toEqual(expectedState);
      expect(actualState.answers).toContain(radical);
      expect(actualState.mistakes).not.toContain(radical);
    });
    it('should add answer and remove from mistakes', () => {
      const stateWithAnswerAndMistakes: QuizStoreState = {
        maxNumberOfQuestions: 12,
        nextQuestion: null,
        questions: [kanji, word],
        answers: [radical],
        mistakes: [kanji, word],
      };
      const action = QuizActions.addAnswer({ answer: radical });
      const actualState = quizReducer(stateWithMistakes, action);
      const expectedState = { ...stateWithAnswerAndMistakes };

      expect(actualState).toEqual(expectedState);
      expect(actualState.answers).toContain(radical);
      expect(actualState.mistakes).not.toContain(radical);
    });
  });

  describe('QuizActions.addMistake', () => {
    const stateWithMistake: QuizStoreState = {
      maxNumberOfQuestions: 12,
      nextQuestion: null,
      questions,
      answers: [],
      mistakes: [radical],
    };
    it('should add mistake', () => {
      const action = QuizActions.addMistake({ mistake: radical });
      const actualState = quizReducer(stateWithQuestions, action);
      const expectedState = { ...stateWithMistake };

      expect(actualState).toEqual(expectedState);
      expect(actualState.mistakes).toContain(radical);
      expect(actualState.answers).not.toContain(radical);
    });
    it('should add mistake only if doesnt already include', () => {
      const action = QuizActions.addMistake({ mistake: radical });
      const actualState = quizReducer(stateWithMistake, action);
      const expectedState = { ...stateWithMistake };

      expect(actualState).toEqual(expectedState);
      expect(actualState.mistakes).toContain(radical);
      expect(actualState.mistakes.length).toBe(1);
      expect(actualState.answers).not.toContain(radical);
    });
  });

  describe('QuizActions.clearAnswers', () => {
    it('should clear answers', () => {
      const stateWithAnswers: QuizStoreState = {
        maxNumberOfQuestions: 12,
        nextQuestion: null,
        questions,
        answers: questions,
        mistakes: [],
      };
      const action = QuizActions.clearAnswers();
      const actualState = quizReducer(stateWithAnswers, action);
      const expectedState = { ...initialState };

      expect(actualState).toEqual(expectedState);
      expect(actualState.questions).toEqual([]);
      expect(actualState.answers).toEqual([]);
    });
  });

  describe('QuizActions.clearMistakes', () => {
    it('should clear mistakes', () => {
      const action = QuizActions.clearMistakes();
      const actualState = quizReducer(stateWithMistakes, action);
      const expectedState = { ...initialState };

      expect(actualState).toEqual(expectedState);
      expect(actualState.questions).toEqual([]);
      expect(actualState.mistakes).toEqual([]);
    });
  });
});
