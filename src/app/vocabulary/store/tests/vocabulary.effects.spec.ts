import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/common/enums/character-type.enum';
import QuizService from 'src/app/quiz/services/quiz.service';
import * as QuizActions from 'src/app/quiz/store/quiz.actions';
import { QuizStoreState } from 'src/app/quiz/store/quiz.reducer';
import AppStoreState from 'src/app/store/app.state';

import Word from '../../models/word.model';
import VocabularyService from '../../services/vocabulary.service';
import VOCABULARY from '../../vocabulary.data';
import * as VocabularyActions from '../vocabulary.actions';
import VocabularyEffects from '../vocabulary.effects';
import { VocabularyStoreState } from '../vocabulary.reducer';

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
const vocabularyState: VocabularyStoreState = {
  vocabulary: mockVocabulary,
};
const quizState: QuizStoreState = {
  maxNumberOfQuestions: 12,
  nextQuestion: null,
  questions: [],
  answers: [],
  mistakes: [],
};
const mockState: Partial<AppStoreState> = {
  vocabulary: vocabularyState,
  quiz: quizState,
};

describe('VocabularyEffects', () => {
  let vocabularyEffects: VocabularyEffects;
  let actions$: ReplaySubject<any>;
  let store: Store<AppStoreState>;
  let vocabularyService: VocabularyService;
  let quizService: QuizService;

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
    store = TestBed.inject(Store);
    vocabularyService = TestBed.inject(VocabularyService);
    quizService = TestBed.inject(QuizService);
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
      (vocabularyService.getAll as jasmine.Spy).and.returnValue(
        of(mockVocabulary)
      );
      vocabularyEffects.fetchVocabulary$.subscribe((resultAction) => {
        expect(resultAction).toEqual(VocabularyActions.saveVocabulary());
        expect(vocabularyService.getAll).toHaveBeenCalled();
      });
    });
  });

  describe('setQuestionsAboutVocabulary$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(VocabularyActions.setVocabulary);
      (quizService.prepareQuestions as jasmine.Spy).and.returnValue(
        mockVocabulary
      );
    });

    it('should return setQuestions action', () => {
      vocabularyEffects.setQuestionsAboutVocabulary$.subscribe(
        (resultAction) => {
          expect(resultAction).toEqual(
            QuizActions.setQuestions({ questions: mockVocabulary })
          );
          expect(quizService.prepareQuestions).toHaveBeenCalled();
        }
      );
    });
  });
});
