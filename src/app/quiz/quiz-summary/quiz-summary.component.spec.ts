import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { pigWarrior } from 'src/app/game/enemy/enemy.data';
import LevelType from 'src/app/game/level/enums/level-type.enum';
import ALL_LEVELS from 'src/app/game/level/level.data';
import Level from 'src/app/game/level/models/level.model';
import { LevelStoreState } from 'src/app/game/level/store/level.reducer';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import Kanji from 'src/app/japanese/kanji/models/kanji.model';
import AppStoreState from 'src/app/store/app.state';

import * as LevelActions from '../../game/level/store/level.actions';
import * as GameActions from '../../game/store/game.actions';
import * as QuizActions from '../../quiz/store/quiz.actions';
import { DEFAULT_QUIZ_OPTIONS, initialState, QuizStoreState } from '../store/quiz.reducer';
import { QuizSummaryComponent } from './quiz-summary.component';

describe('QuizSummaryComponent', () => {
  let component: QuizSummaryComponent;
  let fixture: ComponentFixture<QuizSummaryComponent>;
  let store: Store<AppStoreState>;
  let router: Router;

  const kanji: Kanji = {
    characters: '上',
    meanings: ['above', 'up', 'over'],
    onyomi: ['じょう'],
    kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
    type: CharacterType.KANJI,
  };
  const kanji2: Kanji = {
    characters: '下',
    meanings: ['below', 'down', 'under', 'beneath'],
    onyomi: ['か', 'げ'],
    kunyomi: ['した', 'さ', 'くだ', 'お'],
    type: CharacterType.KANJI,
  };
  const kanji3: Kanji = {
    characters: '大',
    meanings: ['big', 'large'],
    onyomi: ['たい', 'だい'],
    kunyomi: ['おお'],
    nanori: ['ひろ'],
    type: CharacterType.KANJI,
  };
  const kanji4: Kanji = {
    characters: '工',
    meanings: ['construction', 'industry', 'artisan', 'work', 'craft'],
    onyomi: ['こう', 'く'],
    type: CharacterType.KANJI,
  };
  const quizStateWithMistakes: QuizStoreState = {
    ...initialState,
    mistakes: [kanji, kanji2, kanji3, kanji4],
    preferredQuestions: [kanji],
  };
  const quizStateWithPreferredQuestionsInMistakes: QuizStoreState = {
    ...initialState,
    mistakes: [kanji, kanji2, kanji3, kanji4],
    preferredQuestions: [kanji, kanji2, kanji3, kanji4],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizSummaryComponent],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
    }).compileComponents();
  });

  describe('Quiz view', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(QuizSummaryComponent);
      component = fixture.componentInstance;

      store = TestBed.inject(Store);
      router = TestBed.inject(Router);

      spyOn(store, 'select').and.callFake((selector) => {
        if (selector === 'quiz') {
          return of(quizStateWithMistakes);
        } else if (selector === 'level') {
          return of();
        } else if (selector === 'game') {
          return of();
        }
      });
      spyOn(store, 'dispatch');
      spyOn(router, 'navigate');

      fixture.detectChanges();
      component.ngOnInit();
    });

    describe('when initialize component', () => {
      it('should select data from store', () => {
        expect(store.select).toHaveBeenCalled();
      });
    });

    describe('when click try again button', () => {
      it('and is on Game view should dispatch repeatQuiz action', () => {
        component.onTryAgainQuiz();

        expect(store.dispatch).toHaveBeenCalledWith(QuizActions.repeatQuiz());
      });
    });

    describe('when click close button', () => {
      it('and is on Quiz view should dispatch resetQuiz action', () => {
        component.onCloseSummary();

        expect(store.dispatch).toHaveBeenCalledWith(QuizActions.resetQuiz());
      });
    });

    describe('when click add to preferred button', () => {
      it('should dispatch addPreferredQuestions action with mistakes not included in preferred questions', () => {
        component.onAddMistakesToPreferred();

        expect(store.dispatch).toHaveBeenCalledWith(
          QuizActions.addPreferredQuestions({
            preferredQuestions: [kanji2, kanji3, kanji4],
          })
        );
        expect(component.shouldProposeNewPreferredQuestions).toBeTrue();
      });
    });
  });

  describe('Game view', () => {
    const level: Level = {
      levelType: LevelType.RADICAL,
      enemies: [pigWarrior],
      quizOptions: {
        ...DEFAULT_QUIZ_OPTIONS,
        numberOfQuestions: 1,
        questionTypes: [CharacterType.RADICAL],
      },
    };
    const storeWithLevel: LevelStoreState = {
      allLevels: ALL_LEVELS,
      level,
    };

    beforeEach(() => {
      fixture = TestBed.createComponent(QuizSummaryComponent);
      component = fixture.componentInstance;

      store = TestBed.inject(Store);
      router = TestBed.inject(Router);

      spyOn(store, 'select').and.callFake((selector) => {
        if (selector === 'quiz') {
          return of(quizStateWithPreferredQuestionsInMistakes);
        } else if (selector === 'level') {
          return of(storeWithLevel);
        } else if (selector === 'game') {
          return of();
        }
      });
      spyOn(store, 'dispatch');
      spyOn(router, 'navigate');

      fixture.detectChanges();
      component.ngOnInit();
    });

    describe('when initialize component', () => {
      it('should select data from store', () => {
        expect(store.select).toHaveBeenCalled();
      });
    });

    describe('when click try again button', () => {
      it('and is on Game view should dispatch repeatQuiz, resetGame and chooseLevel actions and navigate to Game view', () => {
        component.onTryAgainQuiz();

        expect(store.dispatch).toHaveBeenCalledWith(QuizActions.repeatQuiz());
        expect(store.dispatch).toHaveBeenCalledWith(GameActions.resetGame());
        expect(store.dispatch).toHaveBeenCalledWith(
          LevelActions.chooseLevel({ level })
        );
        expect(router.navigate).toHaveBeenCalledWith(['./game']);
      });
    });

    describe('when click close button', () => {
      it('and is on Game view should dispatch resetQuiz and resetGame actions and naviagte to Levels view', () => {
        component.onCloseSummary();

        expect(store.dispatch).toHaveBeenCalledWith(QuizActions.resetQuiz());
        expect(store.dispatch).toHaveBeenCalledWith(GameActions.resetGame());
        expect(router.navigate).toHaveBeenCalledWith(['./levels']);
      });
    });

    describe('when click add to preferred button', () => {
      it('should not dispatch addPreferredQuestions action', () => {
        expect(component.shouldProposeNewPreferredQuestions).toBeFalse();
      });
    });
  });
});
