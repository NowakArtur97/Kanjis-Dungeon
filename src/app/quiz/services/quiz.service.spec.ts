import { getTestBed, TestBed } from '@angular/core/testing';
import CharacterType from 'src/app/common/enums/character-type.enum';
import MathUtil from 'src/app/common/utils/math.util';
import KANJI from 'src/app/kanji/kanji.data';
import Radical from 'src/app/radical/models/radical.model';
import RADICALS from 'src/app/radical/radical.data';
import VOCABULARY from 'src/app/vocabulary/vocabulary.data';

import QuizCard from '../models/quiz-card.model';
import QuizService from './quiz.service';

describe('quizService', () => {
  let injector: TestBed;
  let quizService: QuizService;

  const radical = {
    id: 1,
    characters: '一',
    meanings: ['ground'],
    type: CharacterType.RADICAL,
  };
  const kanji = {
    id: 3,
    characters: '大',
    meanings: ['big', 'large'],
    onyomi: ['たい', 'だい'],
    kunyomi: ['おお'],
    nanori: ['ひろ'],
    type: CharacterType.KANJI,
  };
  const word = {
    id: 1,
    characters: '大人',
    meanings: ['adult', 'mature'],
    reading: 'おとな',
    type: CharacterType.VOCABULARY,
  };
  const getNumberOfEmptyProperties = (
    character: Radical,
    quizCard: QuizCard
  ): number =>
    Object.getOwnPropertyNames(quizCard).reduce(
      (value, property) =>
        character[property] !== undefined &&
        quizCard[property] !== undefined &&
        (quizCard[property] === '' ||
          (Array.isArray(quizCard[property]) && quizCard[property][0] === ''))
          ? value + 1
          : value,
      0
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [QuizService],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    quizService = injector.inject(QuizService);
  });

  describe('when get next question', () => {
    it('should return question', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(0);

      const questions = [radical, kanji, word];
      const question = quizService.getNextQuestion(questions);

      expect(question).not.toBeNull();
      expect(questions).toContain(question);
      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(1);
    });

    it('with empty array should return undefined', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(0);

      const question = quizService.getNextQuestion([]);

      expect(question).toBeUndefined();
      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(1);
    });
  });

  describe('when prepare questions', () => {
    it('should return three questions', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 1, 2);

      const numberOfQuestions = 9;
      const alreadyChosenQuestionsFromRadicals = [...RADICALS];
      alreadyChosenQuestionsFromRadicals.length = 3;
      const alreadyChosenQuestionsFromVocabulary = [...VOCABULARY];
      alreadyChosenQuestionsFromVocabulary.length = 3;
      const questions = quizService.prepareQuestions(KANJI, numberOfQuestions, [
        ...alreadyChosenQuestionsFromRadicals,
        ...alreadyChosenQuestionsFromVocabulary,
      ]);

      expect(questions.length).toEqual(numberOfQuestions);
      expect(questions[6]).toEqual(KANJI[0]);
      expect(questions[7]).toEqual(KANJI[1]);
      expect(questions[8]).toEqual(KANJI[2]);
      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(3);
    });

    it('should return questions', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 1, 2, 3);

      const numberOfQuestions = 10;
      const alreadyChosenQuestionsFromKanji = [...KANJI];
      alreadyChosenQuestionsFromKanji.length = 3;
      const alreadyChosenQuestionsFromVocabulary = [...VOCABULARY];
      alreadyChosenQuestionsFromVocabulary.length = 3;
      const questions = quizService.prepareQuestions(
        RADICALS,
        numberOfQuestions,
        [
          ...alreadyChosenQuestionsFromKanji,
          ...alreadyChosenQuestionsFromVocabulary,
        ]
      );

      expect(questions.length).toEqual(numberOfQuestions);
      expect(questions[6]).toEqual(RADICALS[0]);
      expect(questions[7]).toEqual(RADICALS[1]);
      expect(questions[8]).toEqual(RADICALS[2]);
      expect(questions[9]).toEqual(RADICALS[3]);
      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(4);
    });
  });

  describe('when choose properties for question', () => {
    describe('as radical', () => {
      it('should return quiz card with properties', () => {
        const quizCard = quizService.choosePropertiesForQuestion(radical);

        expect(quizCard.characters).toEqual(radical.characters);
        expect(quizCard.meanings).toEqual(['']);
        expect(quizCard.onyomi).toEqual(['']);
        expect(quizCard.kunyomi).toEqual(['']);
        expect(quizCard.nanori).toEqual(['']);
        expect(quizCard.reading).toEqual('');
      });
    });

    describe('as kanji', () => {
      it('should return quiz card with two properties', () => {
        const numberOfEmptyPropertiesExpected = 2;
        spyOn(MathUtil, 'getRandomIntValue').and.returnValues(
          numberOfEmptyPropertiesExpected
        );
        spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 0);

        const quizCard = quizService.choosePropertiesForQuestion(kanji);

        const numberOfEmptyPropertiesActual = getNumberOfEmptyProperties(
          kanji,
          quizCard
        );

        expect(quizCard.characters).toEqual(kanji.characters);
        expect(quizCard.meanings).toEqual(['']);
        expect(quizCard.onyomi).toEqual(['']);
        expect(quizCard.kunyomi).toEqual(kanji.kunyomi);
        expect(quizCard.nanori).toEqual(kanji.nanori);
        expect(quizCard.reading).toEqual('');
        expect(
          numberOfEmptyPropertiesActual === numberOfEmptyPropertiesExpected
        ).toBeTrue();
        expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
        expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(2);
      });

      it('should return quiz card with three properties', () => {
        const numberOfEmptyPropertiesExpected = 3;
        spyOn(MathUtil, 'getRandomIntValue').and.returnValues(
          numberOfEmptyPropertiesExpected
        );
        spyOn(MathUtil, 'getRandomIndex').and.returnValues(1, 1, 1);

        const quizCard = quizService.choosePropertiesForQuestion(kanji);

        const numberOfEmptyPropertiesActual = getNumberOfEmptyProperties(
          kanji,
          quizCard
        );

        expect(quizCard.characters).toEqual(kanji.characters);
        expect(quizCard.meanings).toEqual(kanji.meanings);
        expect(quizCard.onyomi).toEqual(['']);
        expect(quizCard.kunyomi).toEqual(['']);
        expect(quizCard.nanori).toEqual(['']);
        expect(quizCard.reading).toEqual('');
        expect(
          numberOfEmptyPropertiesActual === numberOfEmptyPropertiesExpected
        ).toBeTrue();
        expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
        expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(3);
      });
    });

    describe('as word', () => {
      it('should return quiz card with one property', () => {
        const numberOfEmptyPropertiesExpected = 1;
        spyOn(MathUtil, 'getRandomIntValue').and.returnValues(
          numberOfEmptyPropertiesExpected
        );
        spyOn(MathUtil, 'getRandomIndex').and.returnValues(0);

        const quizCard = quizService.choosePropertiesForQuestion(word);

        const numberOfEmptyPropertiesActual = getNumberOfEmptyProperties(
          word,
          quizCard
        );

        expect(quizCard.characters).toEqual(word.characters);
        expect(quizCard.meanings).toEqual(['']);
        expect(quizCard.onyomi).toEqual(['']);
        expect(quizCard.kunyomi).toEqual(['']);
        expect(quizCard.nanori).toEqual(['']);
        expect(quizCard.reading).toEqual(word.reading);
        expect(
          numberOfEmptyPropertiesActual === numberOfEmptyPropertiesExpected
        ).toBeTrue();
        expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
        expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(1);
      });

      it('should return quiz card with two properties', () => {
        const numberOfEmptyPropertiesExpected = 2;
        spyOn(MathUtil, 'getRandomIntValue').and.returnValues(
          numberOfEmptyPropertiesExpected
        );
        spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 0);

        const quizCard = quizService.choosePropertiesForQuestion(word);

        const numberOfEmptyPropertiesActual = getNumberOfEmptyProperties(
          word,
          quizCard
        );

        expect(quizCard.characters).toEqual(word.characters);
        expect(quizCard.meanings).toEqual(['']);
        expect(quizCard.onyomi).toEqual(['']);
        expect(quizCard.kunyomi).toEqual(['']);
        expect(quizCard.nanori).toEqual(['']);
        expect(quizCard.reading).toEqual('');
        expect(
          numberOfEmptyPropertiesActual === numberOfEmptyPropertiesExpected
        ).toBeTrue();
        expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
        expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(2);
      });
    });
  });
});
