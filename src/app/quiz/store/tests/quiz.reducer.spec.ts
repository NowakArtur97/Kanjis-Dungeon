import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import Kanji from 'src/app/japanese/kanji/models/kanji.model';
import Radical from 'src/app/japanese/radical/models/radical.model';
import Word from 'src/app/japanese/vocabulary/models/word.model';

import QuizOptions from '../../models/quiz-options.model';
import * as QuizActions from '../quiz.actions';
import { DEFAULT_QUIZ_OPTIONS, initialState, quizReducer, QuizStoreState } from '../quiz.reducer';

const radical: Radical = {
  characters: '一',
  meanings: ['ground'],
  type: CharacterType.RADICAL,
};
const radical2: Radical = {
  characters: '几',
  meanings: ['table'],
  type: CharacterType.RADICAL,
};
const kanji: Kanji = {
  characters: '上',
  meanings: ['above', 'up', 'over'],
  onyomi: ['じょう'],
  kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
  type: CharacterType.KANJI,
};
const word: Word = {
  characters: '大人',
  meanings: ['adult', 'mature'],
  reading: 'おとな',
  type: CharacterType.VOCABULARY,
};
const questions = [radical, kanji, word];
const quizInitialState: QuizStoreState = {
  ...initialState,
  quizOptions: {
    numberOfQuestions: 12,
    minNumberOfProperties: 1,
    shouldShowAnswer: true,
    shouldHideRandomProperties: true,
    excludedProperties: new Map([
      [CharacterType.RADICAL, ['characters', 'type']],
      [CharacterType.KANJI, ['characters', 'type']],
      [CharacterType.VOCABULARY, ['characters', 'type']],
    ]),
    questionTypes: [
      CharacterType.RADICAL,
      CharacterType.KANJI,
      CharacterType.VOCABULARY,
    ],
  },
};
const stateWithQuestions: QuizStoreState = {
  ...quizInitialState,
  questions,
};
const answers: Radical[] = [radical2];
const mistakes: Radical[] = [radical, kanji, word];
const stateWithQuestionsAndAnswers: QuizStoreState = {
  ...stateWithQuestions,
  questions,
  answers,
};
const stateWithMistakes: QuizStoreState = {
  ...stateWithQuestions,
  mistakes,
};
const stateWithMistakesAndPreferredQuestion: QuizStoreState = {
  ...stateWithMistakes,
  preferredQuestions: [radical],
};
const stateWithSummary: QuizStoreState = {
  ...initialState,
  shouldShowSummary: true,
};
const stateWithPreferredQuestion: QuizStoreState = {
  ...initialState,
  preferredQuestions: [radical],
};
const stateWithPreferredQuestions: QuizStoreState = {
  ...initialState,
  preferredQuestions: [radical, kanji, word],
};

describe('quizReducer', () => {
  describe('QuizActions.setQuiz', () => {
    it('should store questions', () => {
      const action = QuizActions.setQuestions({ questions });
      const actualState = quizReducer(quizInitialState, action);
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
      const actualState = quizReducer(quizInitialState, action);
      const expectedState = { ...quizInitialState };

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
        ...stateWithQuestions,
        nextQuestion: radical,
        questions,
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
        ...stateWithQuestions,
        questions: [kanji, word],
        answers: [radical],
      };
      const action = QuizActions.addAnswer({ answer: radical });
      const actualState = quizReducer(stateWithQuestions, action);
      const expectedState = { ...stateWithAnswer };

      expect(actualState).toEqual(expectedState);
      expect(actualState.answers).toContain(radical);
      expect(actualState.mistakes).not.toContain(radical);
    });

    it('should add answer and not remove from mistakes', () => {
      const stateWithAnswerAndMistakes: QuizStoreState = {
        ...stateWithMistakes,
        nextQuestion: null,
        questions: [kanji, word],
        answers: [radical],
        mistakes: [radical, kanji, word],
      };
      const action = QuizActions.addAnswer({ answer: radical });
      const actualState = quizReducer(stateWithMistakes, action);
      const expectedState = { ...stateWithAnswerAndMistakes };

      expect(actualState).toEqual(expectedState);
      expect(actualState.answers).toContain(radical);
      expect(actualState.mistakes).toContain(radical);
    });
  });

  describe('QuizActions.addMistake', () => {
    const stateWithMistake: QuizStoreState = {
      ...stateWithQuestions,
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

  describe('QuizActions.changeQuizOptions', () => {
    it('should change quiz options and reset questions and answers', () => {
      const quizOptions: QuizOptions = {
        numberOfQuestions: 1,
        minNumberOfProperties: 1,
        shouldShowAnswer: true,
        shouldHideRandomProperties: true,
        excludedProperties: new Map([
          [CharacterType.RADICAL, ['characters', 'type']],
        ]),
        questionTypes: [CharacterType.RADICAL],
      };
      const stateWithNewQuizOptions: QuizStoreState = {
        ...initialState,
        quizOptions,
        questions: [],
        answers: [],
      };
      const action = QuizActions.changeQuizOptions({ quizOptions });
      const actualState = quizReducer(stateWithQuestionsAndAnswers, action);
      const expectedState = { ...stateWithNewQuizOptions };

      expect(actualState).toEqual(expectedState);
      expect(actualState.quizOptions).toEqual(quizOptions);
    });
  });

  describe('QuizActions.showSummary', () => {
    it('should show summary', () => {
      const shouldShowSummary = true;
      const action = QuizActions.showSummary();
      const actualState = quizReducer(initialState, action);
      const expectedState = { ...stateWithSummary };

      expect(actualState).toEqual(expectedState);
      expect(actualState.shouldShowSummary).toEqual(shouldShowSummary);
    });
  });

  describe('QuizActions.resetQuiz', () => {
    it('should reset state', () => {
      const action = QuizActions.resetQuiz();
      const actualState = quizReducer(stateWithMistakes, action);

      expect(actualState).toEqual(initialState);
    });

    it('should reset state but leave preferred questions', () => {
      const action = QuizActions.resetQuiz();
      const actualState = quizReducer(
        stateWithMistakesAndPreferredQuestion,
        action
      );

      expect(actualState).toEqual(stateWithPreferredQuestion);
      expect(actualState.preferredQuestions).toEqual(
        stateWithPreferredQuestion.preferredQuestions
      );
    });
  });

  describe('QuizActions.repeatQuiz', () => {
    it('should reset part of state and set questions based on previous answers', () => {
      const stateAfterQuiz: QuizStoreState = {
        ...initialState,
        questions,
        answers,
        mistakes,
        shouldShowSummary: true,
      };
      const action = QuizActions.repeatQuiz();
      const actualState = quizReducer(stateAfterQuiz, action);

      const stateToRepeat: QuizStoreState = {
        ...quizInitialState,
        questions: [...answers],
        quizOptions: DEFAULT_QUIZ_OPTIONS,
      };

      expect(actualState).toEqual(stateToRepeat);
      expect(actualState.questions).toEqual(answers);
      expect(actualState.mistakes).toEqual([]);
      expect(actualState.answers).toEqual([]);
      expect(actualState.shouldShowSummary).toBeFalse();
    });
  });

  describe('QuizActions.setPreferredQuestions', () => {
    it('should set preferred questions', () => {
      const preferredQuestions = [radical, kanji, word];

      const action = QuizActions.setPreferredQuestions({ preferredQuestions });
      const actualState = quizReducer(initialState, action);
      const expectedState = { ...stateWithPreferredQuestions };

      expect(actualState).toEqual(expectedState);
      expect(actualState.preferredQuestions).toEqual(preferredQuestions);
    });
  });

  describe('QuizActions.addPreferedQuestion', () => {
    it('should add preferred question', () => {
      const preferredQuestion = radical;

      const action = QuizActions.addPreferredQuestion({ preferredQuestion });
      const actualState = quizReducer(initialState, action);
      const expectedState = { ...stateWithPreferredQuestion };

      expect(actualState).toEqual(expectedState);
      expect(actualState.preferredQuestions).toContain(preferredQuestion);
    });
  });

  describe('QuizActions.addPreferredQuestions', () => {
    it('should add preferred questions', () => {
      const preferredQuestions = [radical, kanji, word];

      const action = QuizActions.addPreferredQuestions({ preferredQuestions });
      const actualState = quizReducer(initialState, action);
      const expectedState = { ...stateWithPreferredQuestions };

      expect(actualState).toEqual(expectedState);
      expect(actualState.preferredQuestions).toEqual(preferredQuestions);
    });
  });

  describe('QuizActions.removePreferedQuestion', () => {
    it('should remove preferred question', () => {
      const preferredQuestionToRemove = radical;
      const action = QuizActions.removePreferredQuestion({
        preferredQuestionToRemove,
      });
      const actualState = quizReducer(stateWithPreferredQuestion, action);
      const expectedState = { ...initialState };

      expect(actualState).toEqual(expectedState);
      expect(actualState.preferredQuestions).not.toContain(
        preferredQuestionToRemove
      );
    });

    describe('QuizActions.removePreferedQuestions', () => {
      it('should remove preferred questions', () => {
        const preferredQuestionsToRemove = [radical, kanji, word];
        const action = QuizActions.removePreferredQuestions({
          preferredQuestionsToRemove,
        });
        const actualState = quizReducer(stateWithPreferredQuestions, action);
        const expectedState = { ...initialState };

        expect(actualState).toEqual(expectedState);
        expect(actualState.preferredQuestions).not.toContain(radical);
        expect(actualState.preferredQuestions).not.toContain(kanji);
        expect(actualState.preferredQuestions).not.toContain(word);
      });

      it('should remove preferred questions', () => {
        const preferredQuestionsToRemove = [kanji, word];
        const action = QuizActions.removePreferredQuestions({
          preferredQuestionsToRemove,
        });
        const actualState = quizReducer(stateWithPreferredQuestions, action);
        const expectedState = { ...stateWithPreferredQuestion };

        expect(actualState).toEqual(expectedState);
        expect(actualState.preferredQuestions).toContain(radical);
        expect(actualState.preferredQuestions).not.toContain(kanji);
        expect(actualState.preferredQuestions).not.toContain(word);
      });
    });

    describe('QuizActions.setQuizProgress', () => {
      it('should set questions, answers, mistakes and quizOptions', () => {
        const quizOptions: QuizOptions = {
          numberOfQuestions: 1,
          minNumberOfProperties: 1,
          shouldShowAnswer: true,
          shouldHideRandomProperties: true,
          excludedProperties: new Map([
            [CharacterType.RADICAL, ['characters', 'type']],
          ]),
          questionTypes: [CharacterType.RADICAL],
        };
        const action = QuizActions.setQuizProgress({
          questions,
          answers,
          mistakes,
          quizOptions,
        });
        const stateWithQuizProgress = {
          ...initialState,
          questions,
          answers,
          mistakes,
          quizOptions,
        };
        const actualState = quizReducer(initialState, action);
        const expectedState = { ...stateWithQuizProgress };

        expect(actualState).toEqual(expectedState);
        expect(actualState.questions).toEqual(questions);
        expect(actualState.answers).toEqual(answers);
        expect(actualState.mistakes).toEqual(mistakes);
        expect(actualState.quizOptions).toEqual(quizOptions);
      });
    });
  });
});
