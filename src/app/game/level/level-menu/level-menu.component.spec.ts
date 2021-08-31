import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import { DEFAULT_QUIZ_OPTIONS } from 'src/app/quiz/store/quiz.reducer';
import AppStoreState from 'src/app/store/app.state';

import { pigWarrior } from '../../enemy/enemy.data';
import LevelType from '../enums/level-type.enum';
import Level from '../models/level.model';
import * as LevelActions from '../store/level.actions';
import { initialState } from '../store/level.reducer';
import { LevelMenuComponent } from './level-menu.component';

describe('LevelMenuComponent', () => {
  let component: LevelMenuComponent;
  let fixture: ComponentFixture<LevelMenuComponent>;
  let store: Store<AppStoreState>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelMenuComponent],
      imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
      providers: [Store],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelMenuComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  describe('when initialize component with quiz phase', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
      spyOn(store, 'select').and.callFake(() => of(initialState));

      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should dispatch setupLevels action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(LevelActions.setupLevels());
      expect(store.select).toHaveBeenCalled();
    });
  });

  describe('when select level', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
      spyOn(store, 'select').and.callFake(() => of(initialState));
      spyOn(router, 'navigate');

      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should dispatch chooseLevel action and redirect to game path', () => {
      const level: Level = {
        levelType: LevelType.RADICAL,
        enemies: [pigWarrior],
        quizOptions: {
          ...DEFAULT_QUIZ_OPTIONS,
          numberOfQuestions: 6,
          questionTypes: [CharacterType.RADICAL],
        },
      };
      component.onChoseLevel(level);

      expect(store.dispatch).toHaveBeenCalledWith(
        LevelActions.chooseLevel({ level })
      );
      expect(router.navigate).toHaveBeenCalledWith(['./game']);
      expect(store.select).toHaveBeenCalled();
    });
  });
});
