import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/common/enums/character-type.enum';
import Kanji from 'src/app/japanese/kanji/models/kanji.model';
import Radical from 'src/app/japanese/radical/models/radical.model';
import Word from 'src/app/japanese/vocabulary/models/word.model';
import QuizService from 'src/app/quiz/services/quiz.service';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../quiz.actions';
import QuizEffects from '../quiz.effects';

const radical: Radical = {
  id: 1,
  characters: '一',
  meanings: ['ground'],
  type: CharacterType.RADICAL,
};
const radicals: Radical[] = [
  radical,
  {
    id: 2,
    characters: '二',
    meanings: ['two'],
    type: CharacterType.RADICAL,
  },
];
const kanji: Kanji[] = [
  {
    id: 1,
    characters: '上',
    meanings: ['above', 'up', 'over'],
    onyomi: ['じょう'],
    kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
    type: CharacterType.KANJI,
  },
  {
    id: 2,
    characters: '下',
    meanings: ['below', 'down', 'under', 'beneath'],
    onyomi: ['か', 'げ'],
    kunyomi: ['した', 'さ', 'くだ', 'お'],
    type: CharacterType.KANJI,
  },
];
const vocabulary: Word[] = [
  {
    id: 1,
    characters: '大人',
    meanings: ['adult', 'mature'],
    reading: 'おとな',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 2,
    characters: '一人',
    meanings: ['alone', 'one person'],
    reading: 'ひとり',
    type: CharacterType.VOCABULARY,
  },
];

describe('QuizEffects', () => {
  let quizEffects: QuizEffects;
  let actions$: ReplaySubject<any>;
  let store: Store<AppStoreState>;
  let quizService: QuizService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        QuizEffects,
        Store,
        provideMockActions(() => actions$),
        {
          provide: QuizService,
          useValue: jasmine.createSpyObj('quizService', [
            'getNextQuestion',
            'prepareQuestions',
          ]),
        },
      ],
    })
  );

  beforeEach(() => {
    quizEffects = TestBed.inject(QuizEffects);
    store = TestBed.inject(Store);
    quizService = TestBed.inject(QuizService);
  });

  describe('setNextQuestion$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(QuizActions.setQuestions);
      (quizService.getNextQuestion as jasmine.Spy).and.returnValue(radical);
    });

    it('should return a setNextQuestion action', () => {
      quizEffects.setNextQuestion$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          QuizActions.setNextQuestion({ nextQuestion: radical })
        );
        expect(quizService.getNextQuestion).toHaveBeenCalled();
      });
    });
  });

  describe('setQuestions$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(QuizActions.changeQuizOptions);
      (quizService.prepareQuestions as jasmine.Spy).and.returnValues(
        radicals,
        [...radicals, ...kanji],
        [...radicals, ...kanji, ...vocabulary]
      );
    });

    it('should return setQuestions action', () => {
      quizEffects.setQuestions$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          QuizActions.setQuestions({
            questions: [...radicals, ...kanji, ...vocabulary],
          })
        );
        expect(quizService.prepareQuestions).toHaveBeenCalledTimes(3);
      });
    });
  });
});
