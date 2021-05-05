import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import QuizService from 'src/app/quiz/services/quiz.service';

import Word from '../../models/word.model';
import VocabularyService from '../../services/vocabulary.service';
import VOCABULARY from '../../vocabulary.data';
import * as VocabularyActions from '../vocabulary.actions';
import VocabularyEffects from '../vocabulary.effects';

describe('VocabularyEffects', () => {
  let vocabularyEffects: VocabularyEffects;
  let actions$: ReplaySubject<any>;
  let vocabularyService: VocabularyService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        VocabularyEffects,
        Store,
        provideMockActions(() => actions$),
        {
          provide: VocabularyService,
          useValue: jasmine.createSpyObj('vocabularyService', [
            'save',
            'getAll',
          ]),
        },
        {
          provide: QuizService,
          useValue: jasmine.createSpyObj('quizService', ['prepareQuestions']),
        },
      ],
    })
  );

  beforeEach(() => {
    vocabularyEffects = TestBed.inject(VocabularyEffects);
    vocabularyService = TestBed.inject(VocabularyService);
  });

  describe('saveVocabulary$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(VocabularyActions.saveVocabulary());
      (vocabularyService.save as jasmine.Spy).and.returnValue(of(VOCABULARY));
    });

    it('should return setVocabulary action', () => {
      vocabularyEffects.fetchVocabulary$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          VocabularyActions.setVocabulary({ vocabulary: VOCABULARY })
        );
        expect(vocabularyService.save).toHaveBeenCalled();
      });
    });
  });

  describe('fetchVocabulary$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(VocabularyActions.fetchVocabulary());
    });

    it('when number of vocabulary on firebase is same or bigger than locally should return setVocabulary action', () => {
      (vocabularyService.getAll as jasmine.Spy).and.returnValue(of(VOCABULARY));
      vocabularyEffects.fetchVocabulary$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          VocabularyActions.setVocabulary({ vocabulary: VOCABULARY })
        );
        expect(vocabularyService.getAll).toHaveBeenCalled();
      });
    });

    it('when number of vocabulary on firebase is smaller than locally should return saveVocabulary action', () => {
      const mockVocabulary: Word[] = [
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

      (vocabularyService.getAll as jasmine.Spy).and.returnValue(
        of(mockVocabulary)
      );
      vocabularyEffects.fetchVocabulary$.subscribe((resultAction) => {
        expect(resultAction).toEqual(VocabularyActions.saveVocabulary());
        expect(vocabularyService.getAll).toHaveBeenCalled();
      });
    });
  });
});