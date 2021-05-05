import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import QuizService from 'src/app/quiz/services/quiz.service';

import KANJI from '../../kanji.data';
import Kanji from '../../models/kanji.model';
import KanjiService from '../../services/kanji.service';
import * as KanjiActions from '../kanji.actions';
import KanjiEffects from '../kanji.effects';

describe('KanjiEffects', () => {
  let kanjiEffects: KanjiEffects;
  let actions$: ReplaySubject<any>;
  let kanjiService: KanjiService;

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
    kanjiService = TestBed.inject(KanjiService);
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

      (kanjiService.getAll as jasmine.Spy).and.returnValue(of(mockKanji));
      kanjiEffects.fetchKanji$.subscribe((resultAction) => {
        expect(resultAction).toEqual(KanjiActions.saveKanji());
        expect(kanjiService.getAll).toHaveBeenCalled();
      });
    });
  });
});