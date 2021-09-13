import { getTestBed, TestBed } from '@angular/core/testing';
import MathUtil from 'src/app/common/utils/math.util';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import KANJI from 'src/app/japanese/kanji/kanji.data';
import Radical from 'src/app/japanese/radical/models/radical.model';
import RADICALS from 'src/app/japanese/radical/radical.data';
import VOCABULARY from 'src/app/japanese/vocabulary/vocabulary.data';

import QuizCard from '../models/quiz-card.model';
import QuizOptions from '../models/quiz-options.model';
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
  const quizOptionsWithHiddenRandomProperties: QuizOptions = {
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
  };
  const quizOptionsWithoutHiddenRandomProperties: QuizOptions = {
    ...quizOptionsWithHiddenRandomProperties,
    shouldHideRandomProperties: false,
    excludedProperties: new Map([
      [CharacterType.RADICAL, ['meanings', 'characters', 'type']],
      [CharacterType.KANJI, ['onyomi', 'kunyomi', 'characters', 'type']],
      [CharacterType.VOCABULARY, ['reading', 'characters', 'type']],
    ]),
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
      spyOn(MathUtil, 'getRandomIndex').and.returnValue(0);

      const questions: Radical[] = [radical, kanji, word];
      const question = quizService.getNextQuestion(questions);

      expect(question).not.toBeNull();
      expect(questions).toContain(question);

      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(1);
    });

    it('with empty array should return undefined', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValue(0);

      const question = quizService.getNextQuestion([]);

      expect(question).toBeUndefined();

      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(1);
    });
  });

  describe('when prepare questions', () => {
    it('should return three questions', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 1, 2);

      const options = {
        ...quizOptionsWithHiddenRandomProperties,
        numberOfQuestions: 9,
      };
      const alreadyChosenQuestionsFromRadicals = [...RADICALS];
      alreadyChosenQuestionsFromRadicals.length = 3;
      const alreadyChosenQuestionsFromVocabulary = [...VOCABULARY];
      alreadyChosenQuestionsFromVocabulary.length = 3;
      const questions = quizService.prepareQuestions(KANJI, options, [
        ...alreadyChosenQuestionsFromRadicals,
        ...alreadyChosenQuestionsFromVocabulary,
      ]);

      expect(questions.length).toEqual(options.numberOfQuestions);
      expect(questions[6]).toEqual(KANJI[0]);
      expect(questions[7]).toEqual(KANJI[1]);
      expect(questions[8]).toEqual(KANJI[2]);

      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(3);
    });

    it('should return questions', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 1, 2, 3);

      const options = {
        ...quizOptionsWithHiddenRandomProperties,
        numberOfQuestions: 10,
      };
      const alreadyChosenQuestionsFromKanji = [...KANJI];
      alreadyChosenQuestionsFromKanji.length = 3;
      const alreadyChosenQuestionsFromVocabulary = [...VOCABULARY];
      alreadyChosenQuestionsFromVocabulary.length = 3;
      const questions = quizService.prepareQuestions(RADICALS, options, [
        ...alreadyChosenQuestionsFromKanji,
        ...alreadyChosenQuestionsFromVocabulary,
      ]);

      expect(questions.length).toEqual(options.numberOfQuestions);
      expect(questions[6]).toEqual(RADICALS[0]);
      expect(questions[7]).toEqual(RADICALS[1]);
      expect(questions[8]).toEqual(RADICALS[2]);
      expect(questions[9]).toEqual(RADICALS[3]);

      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(4);
    });
  });

  describe('when choose random properties for question', () => {
    describe('as radical', () => {
      it('should return quiz card with properties', () => {
        const numberOfEmptyPropertiesExpected = 1;
        spyOn(MathUtil, 'getRandomIntValue').and.returnValue(
          numberOfEmptyPropertiesExpected
        );
        spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 0);

        const quizCard = quizService.choosePropertiesForQuestion(
          radical,
          quizOptionsWithHiddenRandomProperties
        );

        const numberOfEmptyPropertiesActual = getNumberOfEmptyProperties(
          radical,
          quizCard
        );

        expect(quizCard.characters).toEqual(radical.characters);
        expect(quizCard.meanings).toEqual(['']);
        expect(quizCard.onyomi).toEqual(['']);
        expect(quizCard.kunyomi).toEqual(['']);
        expect(quizCard.nanori).toEqual(['']);
        expect(quizCard.reading).toEqual('');

        expect(numberOfEmptyPropertiesExpected).toBe(
          numberOfEmptyPropertiesActual
        );

        expect(MathUtil.getRandomIntValue).not.toHaveBeenCalled();
        expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(1);
      });
    });

    describe('as kanji', () => {
      it('should return quiz card with two properties', () => {
        const numberOfEmptyPropertiesExpected = 2;
        spyOn(MathUtil, 'getRandomIntValue').and.returnValue(
          numberOfEmptyPropertiesExpected
        );
        spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 0);

        const quizCard = quizService.choosePropertiesForQuestion(
          kanji,
          quizOptionsWithHiddenRandomProperties
        );

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

        expect(numberOfEmptyPropertiesExpected).toBe(
          numberOfEmptyPropertiesActual
        );

        expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
        expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(2);
      });

      it('should return quiz card with three properties', () => {
        const numberOfEmptyPropertiesExpected = 3;
        spyOn(MathUtil, 'getRandomIntValue').and.returnValue(
          numberOfEmptyPropertiesExpected
        );
        spyOn(MathUtil, 'getRandomIndex').and.returnValues(1, 1, 1);

        const quizCard = quizService.choosePropertiesForQuestion(
          kanji,
          quizOptionsWithHiddenRandomProperties
        );

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

        expect(numberOfEmptyPropertiesExpected).toBe(
          numberOfEmptyPropertiesActual
        );

        expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
        expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(3);
      });
    });

    describe('as vocabulary', () => {
      it('should return quiz card with one property', () => {
        const numberOfEmptyPropertiesExpected = 1;
        spyOn(MathUtil, 'getRandomIntValue').and.returnValue(
          numberOfEmptyPropertiesExpected
        );
        spyOn(MathUtil, 'getRandomIndex').and.returnValue(0);

        const quizCard = quizService.choosePropertiesForQuestion(
          word,
          quizOptionsWithHiddenRandomProperties
        );

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

        expect(numberOfEmptyPropertiesExpected).toBe(
          numberOfEmptyPropertiesActual
        );

        expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
        expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(1);
      });

      it('should return quiz card with two properties', () => {
        const numberOfEmptyPropertiesExpected = 2;
        spyOn(MathUtil, 'getRandomIntValue').and.returnValue(
          numberOfEmptyPropertiesExpected
        );
        spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 0);

        const quizCard = quizService.choosePropertiesForQuestion(
          word,
          quizOptionsWithHiddenRandomProperties
        );

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

        expect(numberOfEmptyPropertiesExpected).toBe(
          numberOfEmptyPropertiesActual
        );

        expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
        expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('when choose specific properties for question', () => {
    it('should return radical quiz card with specific properties', () => {
      const numberOfEmptyPropertiesExpected = 1;
      spyOn(MathUtil, 'getRandomIntValue');
      spyOn(MathUtil, 'getRandomIndex');

      const quizCard = quizService.choosePropertiesForQuestion(
        radical,
        quizOptionsWithoutHiddenRandomProperties
      );

      const numberOfEmptyPropertiesActual = getNumberOfEmptyProperties(
        word,
        quizCard
      );

      expect(quizCard.characters).toEqual(radical.characters);
      expect(quizCard.meanings).toEqual(radical.meanings);
      expect(quizCard.onyomi).toEqual(['']);
      expect(quizCard.kunyomi).toEqual(['']);
      expect(quizCard.nanori).toEqual(['']);
      expect(quizCard.reading).toEqual('');

      expect(numberOfEmptyPropertiesExpected).toBe(
        numberOfEmptyPropertiesActual
      );

      expect(MathUtil.getRandomIntValue).not.toHaveBeenCalled();
      expect(MathUtil.getRandomIndex).not.toHaveBeenCalled();
    });

    it('should return kanji quiz card with specific properties', () => {
      const numberOfEmptyPropertiesExpected = 2;
      spyOn(MathUtil, 'getRandomIntValue');
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(0, 0);

      const quizCard = quizService.choosePropertiesForQuestion(
        kanji,
        quizOptionsWithoutHiddenRandomProperties
      );

      const numberOfEmptyPropertiesActual = getNumberOfEmptyProperties(
        kanji,
        quizCard
      );

      expect(quizCard.characters).toEqual(kanji.characters);
      expect(quizCard.meanings).toEqual(['']);
      expect(quizCard.onyomi).toEqual(kanji.onyomi);
      expect(quizCard.kunyomi).toEqual(kanji.kunyomi);
      expect(quizCard.nanori).toEqual(['']);
      expect(quizCard.reading).toEqual('');

      expect(numberOfEmptyPropertiesExpected).toBe(
        numberOfEmptyPropertiesActual
      );

      expect(MathUtil.getRandomIntValue).not.toHaveBeenCalled();
      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(2);
    });

    it('should return vocabulary quiz card with specific properties', () => {
      const numberOfEmptyPropertiesExpected = 1;
      spyOn(MathUtil, 'getRandomIntValue');
      spyOn(MathUtil, 'getRandomIndex').and.returnValue(0);

      const quizCard = quizService.choosePropertiesForQuestion(
        word,
        quizOptionsWithoutHiddenRandomProperties
      );

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

      expect(numberOfEmptyPropertiesExpected).toBe(
        numberOfEmptyPropertiesActual
      );

      expect(MathUtil.getRandomIntValue).not.toHaveBeenCalled();
      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(1);
    });
  });
});
