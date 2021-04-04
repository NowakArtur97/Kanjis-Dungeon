import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AppCommonModule } from 'src/app/common/app-common.module';
import CharacterType from 'src/app/common/enums/character-type.enum';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import QuizService from '../services/quiz.service';
import { QuizStoreState } from '../store/quiz.reducer';
import { QuizCardComponent } from './quiz-card.component';

describe('QuizCardComponent', () => {
  let component: QuizCardComponent;
  let fixture: ComponentFixture<QuizCardComponent>;
  let store: Store<AppStoreState>;
  let quizService: QuizService;

  const initialState: QuizStoreState = {
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
    nextQuestion: null,
    questions: [],
    answers: [],
    mistakes: [],
  };
  const radical = {
    id: 1,
    characters: '一',
    meanings: ['ground'],
    type: CharacterType.RADICAL,
  };
  const kanji = {
    id: 3,
    characters: '大',
    meanings: ['big', 'large'],
    onyomi: ['たい', 'だい'],
    kunyomi: ['おお'],
    nanori: ['ひろ'],
    type: CharacterType.KANJI,
  };
  const word = {
    id: 1,
    characters: '大人',
    meanings: ['adult', 'mature'],
    reading: 'おとな',
    type: CharacterType.VOCABULARY,
  };
  const quizStateWithOnlyVocabularyType: Partial<QuizStoreState> = {
    quizOptions: {
      numberOfQuestions: 12,
      minNumberOfProperties: 1,
      excludedProperties: new Map([
        [CharacterType.RADICAL, ['characters', 'type']],
        [CharacterType.KANJI, ['characters', 'type']],
        [CharacterType.VOCABULARY, ['characters', 'type', 'meanings']],
      ]),
      questionTypes: [CharacterType.VOCABULARY],
    },
    nextQuestion: word,
    questions: [word],
  };
  const quizStateWithRadicalAsQuestion: Partial<QuizStoreState> = {
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
    nextQuestion: radical,
    questions: [radical, kanji, word],
  };
  const quizStateWithKanjiAsQuestion: Partial<QuizStoreState> = {
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
    nextQuestion: kanji,
    questions: [radical, kanji, word],
  };
  const quizStateWithWordAsQuestion: Partial<QuizStoreState> = {
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
    nextQuestion: word,
    questions: [radical, kanji, word],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizCardComponent],
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule,
        ReactiveFormsModule,

        AppCommonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCardComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    quizService = TestBed.inject(QuizService);

    spyOn(store, 'dispatch');
  });

  describe('when initialize component', () => {
    it('should select quiz from store', () => {
      spyOn(store, 'select').and.callFake(() => of(initialState));
      spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

      fixture.detectChanges();
      component.ngOnInit();

      expect(store.select).toHaveBeenCalled();
      expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
    });

    it('should form have default values', () => {
      spyOn(store, 'select').and.callFake(() => of(initialState));
      spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

      fixture.detectChanges();
      component.ngOnInit();

      expect(component.quizFormGroup.get('characters').value).toBe('');
      expect(component.quizFormGroup.get('meaning').value).toEqual('');
      expect(component.quizFormGroup.get('onyomi').value).toEqual('');
      expect(component.quizFormGroup.get('kunyomi').value).toEqual('');
      expect(component.quizFormGroup.get('nanori').value).toEqual('');
      expect(component.quizFormGroup.get('reading').value).toBe('');
      expect(component.quizFormGroup.valid).toBeTrue();
      expect(component.cardStatus.toString()).toBe('0');

      expect(store.select).toHaveBeenCalled();
      expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
    });

    describe('in store is next question', () => {
      it('should form have values based on next question (radical)', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithRadicalAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.returnValue({
          ...radical,
          onyomi: [''],
          kunyomi: [''],
          nanori: [''],
          reading: '',
        });

        fixture.detectChanges();
        component.ngOnInit();

        expect(component.quizFormGroup.get('characters').value).toBe(
          radical.characters
        );
        expect(component.quizFormGroup.get('meaning').value).toEqual(
          radical.meanings[0]
        );
        expect(component.quizFormGroup.get('onyomi').value).toEqual('');
        expect(component.quizFormGroup.get('kunyomi').value).toEqual('');
        expect(component.quizFormGroup.get('nanori').value).toEqual('');
        expect(component.quizFormGroup.get('reading').value).toBe('');
        expect(component.quizFormGroup.valid).toBeTrue();
        expect(component.cardStatus.toString()).toBe('0');

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });

      it('should form have values based on next question (kanji)', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithKanjiAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.returnValue({
          ...kanji,
          reading: '',
        });

        fixture.detectChanges();
        component.ngOnInit();

        expect(component.quizFormGroup.get('characters').value).toBe(
          kanji.characters
        );
        expect(component.quizFormGroup.get('meaning').value).toEqual(
          kanji.meanings[0]
        );
        expect(component.quizFormGroup.get('onyomi').value).toEqual(
          kanji.onyomi[0]
        );
        expect(component.quizFormGroup.get('kunyomi').value).toEqual(
          kanji.kunyomi[0]
        );
        expect(component.quizFormGroup.get('nanori').value).toEqual(
          kanji.nanori[0]
        );
        expect(component.quizFormGroup.get('reading').value).toBe('');
        expect(component.quizFormGroup.valid).toBeTrue();
        expect(component.cardStatus.toString()).toBe('0');

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });

      it('should form have values based on next question (word)', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithWordAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.returnValue({
          ...word,
          onyomi: [''],
          kunyomi: [''],
          nanori: [''],
        });

        fixture.detectChanges();
        component.ngOnInit();

        expect(component.quizFormGroup.get('characters').value).toBe(
          word.characters
        );
        expect(component.quizFormGroup.get('meaning').value).toEqual(
          word.meanings[0]
        );
        expect(component.quizFormGroup.get('onyomi').value).toEqual('');
        expect(component.quizFormGroup.get('kunyomi').value).toEqual('');
        expect(component.quizFormGroup.get('nanori').value).toEqual('');
        expect(component.quizFormGroup.get('reading').value).toBe(word.reading);
        expect(component.quizFormGroup.valid).toBeTrue();
        expect(component.cardStatus.toString()).toBe('0');

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });
    });

    describe('when submit answer', () => {
      it('with correct answer should form be valid (radical)', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithRadicalAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue(radical.characters);
        component.quizFormGroup.get('meaning').setValue(radical.meanings[0]);

        component.onValidateCard();

        expect(component.cardStatus.toString()).toBe('2');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });

      it('with correct answer should form be valid (kanji)', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithKanjiAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue(kanji.characters);
        component.quizFormGroup.get('meaning').setValue(kanji.meanings[0]);
        component.quizFormGroup.get('onyomi').setValue(kanji.onyomi[0]);
        component.quizFormGroup.get('kunyomi').setValue(kanji.kunyomi[0]);
        component.quizFormGroup.get('nanori').setValue(kanji.nanori[0]);

        component.onValidateCard();

        expect(component.cardStatus.toString()).toBe('2');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });

      it('with correct answer should form be valid (word)', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithWordAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue(word.characters);
        component.quizFormGroup.get('meaning').setValue(word.meanings[0]);
        component.quizFormGroup.get('reading').setValue(word.reading);

        component.onValidateCard();

        expect(component.cardStatus.toString()).toBe('2');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });

      it('with default answer from service should form be invalid', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithWordAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.onValidateCard();

        expect(component.cardStatus.toString()).toBe('1');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });
    });

    describe('when confirm answer', () => {
      it('with correct answer should dispatch addAnswer action', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithRadicalAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue(radical.characters);
        component.quizFormGroup.get('meaning').setValue(radical.meanings[0]);

        component.onValidateCard();
        component.onValidateCard();

        expect(component.cardStatus.toString()).toBe('0');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          QuizActions.addAnswer({
            answer: radical,
          })
        );
      });

      it('with correct answer should display all fields', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithOnlyVocabularyType)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.returnValue({
          characters: word.characters,
          meanings: word.meanings,
          reading: '',
        });

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue(word.characters);
        component.quizFormGroup.get('reading').setValue(word.reading);

        component.onValidateCard();
        component.onValidateCard();

        expect(component.cardStatus.toString()).toBe('0');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(component.quizFormGroup.get('characters').value).toBe(
          word.characters
        );
        expect(component.quizFormGroup.get('meaning').value).toEqual(
          word.meanings[0]
        );
        expect(component.quizFormGroup.get('onyomi').value).toEqual('');
        expect(component.quizFormGroup.get('kunyomi').value).toEqual('');
        expect(component.quizFormGroup.get('nanori').value).toEqual('');
        expect(component.quizFormGroup.get('reading').value).toBe(word.reading);

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          QuizActions.addAnswer({
            answer: word,
          })
        );
      });

      it('with incorrect answer should dispatch addMistake action', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithRadicalAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue('something wrong');
        component.quizFormGroup.get('meaning').setValue('something wrong');

        component.onValidateCard();
        component.onValidateCard();

        expect(component.cardStatus.toString()).toBe('0');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          QuizActions.addMistake({
            mistake: radical,
          })
        );
      });

      it('with incorrect answer should display correct answer', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithRadicalAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue('something wrong');
        component.quizFormGroup.get('meaning').setValue('something wrong');

        component.onValidateCard();
        component.onValidateCard();

        expect(component.cardStatus.toString()).toBe('0');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(component.quizFormGroup.get('characters').value).toBe(
          radical.characters
        );
        expect(component.quizFormGroup.get('meaning').value).toEqual(
          radical.meanings[0]
        );
        expect(component.quizFormGroup.get('onyomi').value).toEqual('');
        expect(component.quizFormGroup.get('kunyomi').value).toEqual('');
        expect(component.quizFormGroup.get('nanori').value).toEqual('');
        expect(component.quizFormGroup.get('reading').value).toBe('');

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          QuizActions.addMistake({
            mistake: radical,
          })
        );
      });
    });

    describe('form validation', () => {
      it('with empty answer should form show correct answer (radical)', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithRadicalAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue('');
        component.quizFormGroup.get('meaning').setValue('');

        component.onValidateCard();

        expect(component.quizFormGroup.get('characters').value).toBe(
          radical.characters
        );
        expect(component.quizFormGroup.get('meaning').value).toEqual(
          radical.meanings[0]
        );
        expect(component.quizFormGroup.get('onyomi').value).toEqual('');
        expect(component.quizFormGroup.get('kunyomi').value).toEqual('');
        expect(component.quizFormGroup.get('nanori').value).toEqual('');
        expect(component.quizFormGroup.get('reading').value).toBe('');

        expect(component.cardStatus.toString()).toBe('1');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });

      it('with empty answer should form show correct answer (kanji)', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithKanjiAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue('');
        component.quizFormGroup.get('meaning').setValue('');
        component.quizFormGroup.get('onyomi').setValue('');
        component.quizFormGroup.get('kunyomi').setValue('');
        component.quizFormGroup.get('nanori').setValue('');

        component.onValidateCard();

        expect(component.quizFormGroup.get('characters').value).toBe(
          kanji.characters
        );
        expect(component.quizFormGroup.get('meaning').value).toEqual(
          kanji.meanings[0]
        );
        expect(component.quizFormGroup.get('onyomi').value).toEqual(
          kanji.onyomi[0]
        );
        expect(component.quizFormGroup.get('kunyomi').value).toEqual(
          kanji.kunyomi[0]
        );
        expect(component.quizFormGroup.get('nanori').value).toEqual(
          kanji.nanori[0]
        );
        expect(component.quizFormGroup.get('reading').value).toBe('');

        expect(component.cardStatus.toString()).toBe('1');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });

      it('with empty answer should form show correct answer (word)', () => {
        spyOn(store, 'select').and.callFake(() =>
          of(quizStateWithWordAsQuestion)
        );
        spyOn(quizService, 'choosePropertiesForQuestion').and.callThrough();

        fixture.detectChanges();
        component.ngOnInit();

        component.quizFormGroup.get('characters').setValue('');
        component.quizFormGroup.get('meaning').setValue('');
        component.quizFormGroup.get('reading').setValue('');

        component.onValidateCard();

        expect(component.quizFormGroup.get('characters').value).toBe(
          word.characters
        );
        expect(component.quizFormGroup.get('meaning').value).toEqual(
          word.meanings[0]
        );
        expect(component.quizFormGroup.get('onyomi').value).toEqual('');
        expect(component.quizFormGroup.get('kunyomi').value).toEqual('');
        expect(component.quizFormGroup.get('nanori').value).toEqual('');
        expect(component.quizFormGroup.get('reading').value).toBe(word.reading);

        expect(component.cardStatus.toString()).toBe('1');
        expect(component.quizFormGroup.valid).toBeTrue();

        expect(store.select).toHaveBeenCalled();
        expect(quizService.choosePropertiesForQuestion).toHaveBeenCalled();
      });
    });
  });
});
