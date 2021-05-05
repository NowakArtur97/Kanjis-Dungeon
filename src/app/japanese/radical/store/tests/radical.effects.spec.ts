import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import QuizService from 'src/app/quiz/services/quiz.service';
import AppStoreState from 'src/app/store/app.state';

import Radical from '../../models/radical.model';
import RADICALS from '../../radical.data';
import RadicalService from '../../services/radical.service';
import * as RadicalActions from '../radical.actions';
import RadicalEffects from '../radical.effects';

describe('RadicalEffects', () => {
  let radicalEffects: RadicalEffects;
  let actions$: ReplaySubject<any>;
  let store: Store<AppStoreState>;
  let radicalService: RadicalService;
  let quizService: QuizService;

  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        RadicalEffects,
        Store,
        provideMockActions(() => actions$),
        {
          provide: RadicalService,
          useValue: jasmine.createSpyObj('radicalService', ['save', 'getAll']),
        },
        {
          provide: QuizService,
          useValue: jasmine.createSpyObj('quizService', ['prepareQuestions']),
        },
      ],
    })
  );

  beforeEach(() => {
    radicalEffects = TestBed.inject(RadicalEffects);
    store = TestBed.inject(Store);
    radicalService = TestBed.inject(RadicalService);
    quizService = TestBed.inject(QuizService);
  });

  describe('saveRadicals$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(RadicalActions.saveRadicals());
      (radicalService.save as jasmine.Spy).and.returnValue(of(RADICALS));
    });

    it('should return setRadicals action', () => {
      radicalEffects.fetchRadicals$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          RadicalActions.setRadicals({ radicals: RADICALS })
        );
        expect(radicalService.save).toHaveBeenCalled();
      });
    });
  });

  describe('fetchRadicals$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(RadicalActions.fetchRadicals());
    });

    it('when number of radicals on firebase is same or bigger than locally should return setRadicals action', () => {
      (radicalService.getAll as jasmine.Spy).and.returnValue(of(RADICALS));
      radicalEffects.fetchRadicals$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          RadicalActions.setRadicals({ radicals: RADICALS })
        );
        expect(radicalService.getAll).toHaveBeenCalled();
      });
    });

    it('when number of radicals on firebase is smaller than locally should return saveRadicals action', () => {
      const mockRadicals: Radical[] = [
        {
          id: 1,
          characters: '一',
          meanings: ['ground'],
          type: CharacterType.RADICAL,
        },
        {
          id: 2,
          characters: '二',
          meanings: ['two'],
          type: CharacterType.RADICAL,
        },
      ];

      (radicalService.getAll as jasmine.Spy).and.returnValue(of(mockRadicals));
      radicalEffects.fetchRadicals$.subscribe((resultAction) => {
        expect(resultAction).toEqual(RadicalActions.saveRadicals());
        expect(radicalService.getAll).toHaveBeenCalled();
      });
    });
  });
});
