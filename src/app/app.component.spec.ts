import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';
import { JapaneseModule } from './japanese/japanese.module';
import * as KanjiActions from './japanese/kanji/store/kanji.actions';
import * as RadicalActions from './japanese/radical/store/radical.actions';
import * as VocabularyActions from './japanese/vocabulary/store/vocabulary.actions';
import { QuizModule } from './quiz/quiz.module';
import * as QuizActions from './quiz/store/quiz.actions';
import AppStoreState from './store/app.state';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<AppStoreState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule,
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
        HttpClientTestingModule,

        JapaneseModule,
        GameModule,
        QuizModule,
      ],
      providers: [Store],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should dispatch getPreferredQuestionsFromStorage and not dispatch saveRadicals, saveKanji and saveVocabulary actions', () => {
      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.getDataFromStorage()
      );
      expect(store.dispatch).not.toHaveBeenCalledWith(
        RadicalActions.saveRadicals()
      );
      expect(store.dispatch).not.toHaveBeenCalledWith(KanjiActions.saveKanji());
      expect(store.dispatch).not.toHaveBeenCalledWith(
        VocabularyActions.saveVocabulary()
      );
    });
  });
});
