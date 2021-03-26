import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/common/enums/character-type.enum';
import QuizService from 'src/app/quiz/services/quiz.service';
import * as QuizActions from 'src/app/quiz/store/quiz.actions';
import { QuizStoreState } from 'src/app/quiz/store/quiz.reducer';
import AppStoreState from 'src/app/store/app.state';

import KANJI from '../../kanji.data';
import Kanji from '../../models/kanji.model';
import KanjiService from '../../services/kanji.service';
import * as KanjiActions from '../kanji.actions';
import KanjiEffects from '../kanji.effects';
import { KanjiStoreState } from '../kanji.reducer';

const mockKanji: Kanji[] = [
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
const kanjiState: KanjiStoreState = {
  kanji: mockKanji,
};
const quizState: QuizStoreState = {
  maxNumberOfQuestions: 12,
  nextQuestion: null,
  questions: [],
  answers: [],
  mistakes: [],
};
const mockState: Partial<AppStoreState> = {
  kanji: kanjiState,
  quiz: quizState,
};

describe('KanjiEffects', () => {
  let kanjiEffects: KanjiEffects;
  let actions$: ReplaySubject<any>;
  let store: Store<AppStoreState>;
  let kanjiService: KanjiService;
  let quizService: QuizService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        KanjiEffects,
        Store,
        provideMockActions(() => actions$),
        {
          provide: KanjiService,
          useValue: jasmine.createSpyObj('kanjiService', ['save', 'getAll']),
        },
        {
          provide: QuizService,
          useValue: jasmine.createSpyObj('quizService', ['prepareQuestions']),
        },
      ],
    })
  );

  beforeEach(() => {
    kanjiEffects = TestBed.inject(KanjiEffects);
    store = TestBed.inject(Store);
    kanjiService = TestBed.inject(KanjiService);
    quizService = TestBed.inject(QuizService);
  });

  describe('saveKanji$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(KanjiActions.saveKanji());
      (kanjiService.save as jasmine.Spy).and.returnValue(of(KANJI));
    });

    it('should return setKanji action', () => {
      kanjiEffects.fetchKanji$.subscribe((resultAction) => {
        expect(resultAction).toEqual(KanjiActions.setKanji({ kanji: KANJI }));
        expect(kanjiService.save).toHaveBeenCalled();
      });
    });
  });

  describe('fetchKanji$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(KanjiActions.fetchKanji());
    });

    it('when number of kanji on firebase is same or bigger than locally should return setKanji action', () => {
      (kanjiService.getAll as jasmine.Spy).and.returnValue(of(KANJI));
      kanjiEffects.fetchKanji$.subscribe((resultAction) => {
        expect(resultAction).toEqual(KanjiActions.setKanji({ kanji: KANJI }));
        expect(kanjiService.getAll).toHaveBeenCalled();
      });
    });

    it('when number of kanji on firebase is smaller than locally should return saveKanji action', () => {
      (kanjiService.getAll as jasmine.Spy).and.returnValue(of(mockKanji));
      kanjiEffects.fetchKanji$.subscribe((resultAction) => {
        expect(resultAction).toEqual(KanjiActions.saveKanji());
        expect(kanjiService.getAll).toHaveBeenCalled();
      });
    });
  });

  describe('setQuestionsAboutKanji$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(KanjiActions.setKanji);
      (quizService.prepareQuestions as jasmine.Spy).and.returnValue(mockKanji);
    });

    it('should return setQuestions action', () => {
      kanjiEffects.setQuestionsAboutKanji$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          QuizActions.setQuestions({ questions: mockKanji })
        );
        expect(quizService.prepareQuestions).toHaveBeenCalled();
      });
    });
  });
});
