import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AppCommonModule } from 'src/app/common/app-common.module';
import CharacterType from 'src/app/common/enums/character-type.enum';
import AppStoreState from 'src/app/store/app.state';

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
        component.quizOptionsFormGroup.get(['radical', 'meanings']).value
      ).toBe(true);
      expect(
        component.quizOptionsFormGroup.get(['kanji', 'meanings']).value
      ).toBe(true);
      expect(
        component.quizOptionsFormGroup.get(['kanji', 'onyomi']).value
      ).toBe(true);
      expect(
        component.quizOptionsFormGroup.get(['kanji', 'onyomi']).value
      ).toBe(true);
      expect(
        component.quizOptionsFormGroup.get(['kanji', 'nanori']).value
      ).toBe(true);
      expect(
        component.quizOptionsFormGroup.get(['vocabulary', 'meanings']).value
      ).toBe(true);

      expect(component.quizOptionsFormGroup.valid).toBeTrue();
      expect(store.select).toHaveBeenCalled();
    });
  });
});
