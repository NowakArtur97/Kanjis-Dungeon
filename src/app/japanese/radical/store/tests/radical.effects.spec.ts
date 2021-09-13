import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';
import CharacterUtil from 'src/app/common/utils/character.util';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import QuizService from 'src/app/quiz/services/quiz.service';

import Radical from '../../models/radical.model';
import RADICALS from '../../radical.data';
import RadicalService from '../../services/radical.service';
import * as RadicalActions from '../radical.actions';
import RadicalEffects from '../radical.effects';

describe('RadicalEffects', () => {
  let radicalEffects: RadicalEffects;
  let actions$: ReplaySubject<any>;
  let radicalService: RadicalService;

  const radicals: Radical[] = [
    {
      characters: '一',
      meanings: ['ground'],
      type: CharacterType.RADICAL,
    },
    {
      characters: '二',
      meanings: ['two'],
      type: CharacterType.RADICAL,
    },
  ];
  const mockRadicals: Radical[] = [
    {
      ...radicals[0],
      id: 1,
    },
    {
      ...radicals[1],
      id: 2,
    },
  ];

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
    radicalService = TestBed.inject(RadicalService);
  });

  describe('saveRadicals$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(RadicalActions.saveRadicals());

      spyOn(CharacterUtil, 'setUpIds').and.returnValues(radicals);
      (radicalService.save as jasmine.Spy).and.returnValue(of(RADICALS));
    });

    it('should return setRadicals action', () => {
      radicalEffects.fetchRadicals$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          RadicalActions.setRadicals({ radicals: mockRadicals })
        );
        expect(radicalService.save).toHaveBeenCalledTimes(1);
        expect(CharacterUtil.setUpIds).toHaveBeenCalledTimes(1);
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
        expect(radicalService.getAll).toHaveBeenCalledTimes(1);
      });
    });

    it('when number of radicals on firebase is smaller than locally should return saveRadicals action', () => {
      (radicalService.getAll as jasmine.Spy).and.returnValue(of(mockRadicals));
      radicalEffects.fetchRadicals$.subscribe((resultAction) => {
        expect(resultAction).toEqual(RadicalActions.saveRadicals());
        expect(radicalService.getAll).toHaveBeenCalledTimes(1);
      });
    });
  });
});
