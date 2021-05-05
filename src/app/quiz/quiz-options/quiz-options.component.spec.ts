import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AppCommonModule } from 'src/app/common/app-common.module';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import QuizOptions from '../models/quiz-options.model';
import { QuizStoreState } from '../store/quiz.reducer';
import { QuizOptionsComponent } from './quiz-options.component';

describe('QuizOptionsComponent', () => {
  let component: QuizOptionsComponent;
  let fixture: ComponentFixture<QuizOptionsComponent>;
  let store: Store<AppStoreState>;

  const initialState: Partial<QuizStoreState> = {
    quizOptions: {
      numberOfQuestions: 12,
      minNumberOfProperties: 1,
      shouldShowAnswer: true,
      shouldHideRandomProperties: true,
      excludedProperties: new Map([
        [CharacterType.RADICAL, ['characters', 'type']],
        [CharacterType.KANJI, ['characters', 'type']],
        [CharacterType.VOCABULARY, ['characters', 'type']],
      ]),
      questionTypes: [
        CharacterType.RADICAL,
        CharacterType.KANJI,
        CharacterType.VOCABULARY,
      ],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizOptionsComponent],
      imports: [StoreModule.forRoot({}), ReactiveFormsModule, AppCommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizOptionsComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.callFake(() => of(initialState));
  });

  describe('when initialize component', () => {
    it('should select quiz options from store', () => {
      fixture.detectChanges();
      component.ngOnInit();

      expect(store.select).toHaveBeenCalled();
    });

    it('should form have default values', () => {
      fixture.detectChanges();
      component.ngOnInit();

      expect(
        component.quizOptionsFormGroup.get(['general', 'numberOfQuestions'])
          .value
      ).toBe(initialState.quizOptions.numberOfQuestions);
      expect(
        component.quizOptionsFormGroup.get(['general', 'shouldShowAnswer'])
          .value
      ).toBe(initialState.quizOptions.shouldShowAnswer);
      expect(
        component.quizOptionsFormGroup.get([
          'general',
          'shouldHideRandomProperties',
        ]).value
      ).toBe(initialState.quizOptions.shouldHideRandomProperties);
      expect(
        component.quizOptionsFormGroup.get(['radical', 'active']).value
      ).toBe(true);
      expect(
        component.quizOptionsFormGroup.get(['radical', 'meanings']).value
      ).toBe(false);
      expect(
        component.quizOptionsFormGroup.get(['kanji', 'active']).value
      ).toBe(true);
      expect(
        component.quizOptionsFormGroup.get(['kanji', 'meanings']).value
      ).toBe(false);
      expect(
        component.quizOptionsFormGroup.get(['kanji', 'onyomi']).value
      ).toBe(false);
      expect(
        component.quizOptionsFormGroup.get(['kanji', 'kunyomi']).value
      ).toBe(false);
      expect(
        component.quizOptionsFormGroup.get(['kanji', 'nanori']).value
      ).toBe(false);
      expect(
        component.quizOptionsFormGroup.get(['vocabulary', 'active']).value
      ).toBe(true);
      expect(
        component.quizOptionsFormGroup.get(['vocabulary', 'meanings']).value
      ).toBe(false);
      expect(
        component.quizOptionsFormGroup.get(['vocabulary', 'reading']).value
      ).toBe(false);

      expect(component.quizOptionsFormGroup.valid).toBeTrue();
      expect(store.select).toHaveBeenCalled();
    });
  });

  describe('when change options', () => {
    it('with default values should dispatch changeQuizOptions action', () => {
      fixture.detectChanges();
      component.ngOnInit();

      const quizOptionsWithoutMinNumberOfProperties: QuizOptions = {
        numberOfQuestions: 12,
        minNumberOfProperties: 1,
        shouldShowAnswer: true,
        shouldHideRandomProperties: true,
        excludedProperties: new Map([
          [CharacterType.RADICAL, ['characters', 'type']],
          [CharacterType.KANJI, ['characters', 'type']],
          [CharacterType.VOCABULARY, ['characters', 'type']],
        ]),
        questionTypes: [
          CharacterType.RADICAL,
          CharacterType.KANJI,
          CharacterType.VOCABULARY,
        ],
      };

      component.onChangeOptions();

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.changeQuizOptions({
          quizOptions: quizOptionsWithoutMinNumberOfProperties,
        })
      );
    });

    it('with changed values should dispatch changeQuizOptions action', () => {
      fixture.detectChanges();
      component.ngOnInit();

      const quizOptions: QuizOptions = {
        numberOfQuestions: 21,
        minNumberOfProperties: 1,
        shouldShowAnswer: false,
        shouldHideRandomProperties: false,
        excludedProperties: new Map([
          [CharacterType.RADICAL, ['meanings', 'characters', 'type']],
          [
            CharacterType.KANJI,
            ['meanings', 'onyomi', 'nanori', 'characters', 'type'],
          ],
          [
            CharacterType.VOCABULARY,
            ['meanings', 'reading', 'characters', 'type'],
          ],
        ]),
        questionTypes: [CharacterType.KANJI, CharacterType.VOCABULARY],
      };

      component.quizOptionsFormGroup
        .get(['general', 'numberOfQuestions'])
        .setValue(quizOptions.numberOfQuestions);
      component.quizOptionsFormGroup
        .get(['general', 'shouldShowAnswer'])
        .setValue(quizOptions.shouldShowAnswer);
      component.quizOptionsFormGroup
        .get(['general', 'shouldHideRandomProperties'])
        .setValue(quizOptions.shouldHideRandomProperties);
      component.quizOptionsFormGroup.get(['radical', 'active']).setValue(false);
      component.quizOptionsFormGroup
        .get(['radical', 'meanings'])
        .setValue(true);
      component.quizOptionsFormGroup.get(['kanji', 'active']).setValue(true);
      component.quizOptionsFormGroup.get(['kanji', 'meanings']).setValue(true);
      component.quizOptionsFormGroup.get(['kanji', 'onyomi']).setValue(true);
      component.quizOptionsFormGroup.get(['kanji', 'kunyomi']).setValue(false);
      component.quizOptionsFormGroup.get(['kanji', 'nanori']).setValue(true);
      component.quizOptionsFormGroup
        .get(['vocabulary', 'active'])
        .setValue(true);
      component.quizOptionsFormGroup
        .get(['vocabulary', 'meanings'])
        .setValue(true);
      component.quizOptionsFormGroup
        .get(['vocabulary', 'reading'])
        .setValue(true);

      component.onChangeOptions();

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.changeQuizOptions({
          quizOptions,
        })
      );
    });

    it('with zero number of questions should not dispatch changeQuizOptions action', () => {
      fixture.detectChanges();
      component.ngOnInit();

      component.quizOptionsFormGroup
        .get(['general', 'numberOfQuestions'])
        .setValue(0);

      component.onChangeOptions();

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('with negative number of questions should not dispatch changeQuizOptions action', () => {
      fixture.detectChanges();
      component.ngOnInit();

      component.quizOptionsFormGroup
        .get(['general', 'numberOfQuestions'])
        .setValue(-10);

      component.onChangeOptions();

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('with zero number of character types should not dispatch changeQuizOptions action', () => {
      fixture.detectChanges();
      component.ngOnInit();

      component.quizOptionsFormGroup.get(['radical', 'active']).setValue(false);
      component.quizOptionsFormGroup.get(['kanji', 'active']).setValue(false);
      component.quizOptionsFormGroup
        .get(['vocabulary', 'active'])
        .setValue(false);

      component.onChangeOptions();

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
