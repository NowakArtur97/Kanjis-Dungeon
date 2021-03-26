import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import * as KanjiActions from './kanji/store/kanji.actions';
import { QuizModule } from './quiz/quiz.module';
import * as RadicalActions from './radical/store/radical.actions';
import AppStoreState from './store/app.state';
import * as VocabularyActions from './vocabulary/store/vocabulary.actions';

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
    it('should not dispatch saveRadicals, saveKanji and saveVocabulary actions', () => {
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
