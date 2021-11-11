import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import MouseButtonClick from 'src/app/japanese/common/enums/mouse-button-click.enum';
import Radical from 'src/app/japanese/radical/models/radical.model';
import RADICALS from 'src/app/japanese/radical/radical.data';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import { QuizStoreState } from '../store/quiz.reducer';
import { QuizQuestionsSelectionComponent } from './quiz-questions-selection.component';

describe('QuizQuestionsSelectionComponent', () => {
  let component: QuizQuestionsSelectionComponent;
  let fixture: ComponentFixture<QuizQuestionsSelectionComponent>;
  let store: Store<AppStoreState>;
  const radical: Radical = {
    characters: '一',
    meanings: ['ground'],
    type: CharacterType.RADICAL,
  };
  const radical2: Radical = {
    characters: '二',
    meanings: ['two'],
    type: CharacterType.RADICAL,
  };
  const quizStateWithPreferredQuestions: Partial<QuizStoreState> = {
    preferredQuestions: [...RADICALS],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizQuestionsSelectionComponent],
      imports: [StoreModule.forRoot({}), BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionsSelectionComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');
  });

  describe('when initialize component', () => {
    it('should select preferred questions from store', () => {
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestions)
      );

      fixture.detectChanges();
      component.ngOnInit();

      expect(store.select).toHaveBeenCalled();
    });
  });

  describe('when select question', () => {
    it('should not dispatch any action if it is first choice', () => {
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestions)
      );

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: radical,
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.LEFT,
      });

      expect(store.select).toHaveBeenCalled();
    });

    it('should not dispatch addPreferredQuestions action when none new questions were selected', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[0], RADICALS[1], RADICALS[2]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[0];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[2],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.LEFT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch addPreferredQuestions action when new question was selected', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[0]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[0];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[1],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.LEFT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.addPreferredQuestions({ preferredQuestions: [RADICALS[1]] })
      );
    });

    it('should dispatch addPreferredQuestions action when multiple new questions were selected', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[0]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[0];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[3],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.LEFT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.addPreferredQuestions({
          preferredQuestions: [RADICALS[1], RADICALS[2], RADICALS[3]],
        })
      );
    });

    it('should dispatch addPreferredQuestions action when multiple new questions were selected in both directions', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[3]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[3];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[0],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.LEFT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.addPreferredQuestions({
          preferredQuestions: [RADICALS[0], RADICALS[1], RADICALS[2]],
        })
      );
    });

    it('should dispatch addPreferredQuestions action and skip already selected', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[0], RADICALS[2]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[0];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[3],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.LEFT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.addPreferredQuestions({
          preferredQuestions: [RADICALS[1], RADICALS[3]],
        })
      );
    });

    it('should dispatch addPreferredQuestions action and skip already selected in both directions', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[1], RADICALS[3]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[3];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[0],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.LEFT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.addPreferredQuestions({
          preferredQuestions: [RADICALS[0], RADICALS[2]],
        })
      );
    });

    it('should not dispatch removePreferredQuestions action when none new questions were removed', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[0]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[1];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[4],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.RIGHT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch removePreferredQuestions action when multiple questions were selected', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[1], RADICALS[2], RADICALS[3]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[0];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[3],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.RIGHT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.removePreferredQuestions({
          preferredQuestionsToRemove: [RADICALS[1], RADICALS[2], RADICALS[3]],
        })
      );
    });

    it('should dispatch removePreferredQuestions action when multiple questions were selected in both directions', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[1], RADICALS[2], RADICALS[3]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[3];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[0],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.RIGHT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.removePreferredQuestions({
          preferredQuestionsToRemove: [RADICALS[1], RADICALS[2], RADICALS[3]],
        })
      );
    });

    it('should dispatch removePreferredQuestions action and skip already removed', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[1], RADICALS[3]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[0];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[3],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.RIGHT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.removePreferredQuestions({
          preferredQuestionsToRemove: [RADICALS[1], RADICALS[3]],
        })
      );
    });

    it('should dispatch removePreferredQuestions action and skip already removed in both directions', () => {
      const quizStateWithPreferredQuestion: Partial<QuizStoreState> = {
        preferredQuestions: [RADICALS[1], RADICALS[3]],
      };
      spyOn(store, 'select').and.callFake(() =>
        of(quizStateWithPreferredQuestion)
      );

      component.lastChosenQuestion = RADICALS[3];

      fixture.detectChanges();
      component.ngOnInit();

      component.onSelectedQuestion({
        chosenQuestion: RADICALS[0],
        wasShiftPressed: true,
        mouseButton: MouseButtonClick.RIGHT,
      });

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.removePreferredQuestions({
          preferredQuestionsToRemove: [RADICALS[1], RADICALS[3]],
        })
      );
    });
  });
});
