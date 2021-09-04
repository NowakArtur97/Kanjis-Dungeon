import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import KANJI from 'src/app/japanese/kanji/kanji.data';
import AppStoreState from 'src/app/store/app.state';

import { initialState, QuizStoreState } from '../store/quiz.reducer';
import { QuizSummaryComponent } from './quiz-summary.component';

describe('QuizSummaryComponent', () => {
  let component: QuizSummaryComponent;
  let fixture: ComponentFixture<QuizSummaryComponent>;
  let store: Store<AppStoreState>;

  const stateWithMistakes: QuizStoreState = {
    ...initialState,
    mistakes: [...KANJI],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizSummaryComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSummaryComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    spyOn(store, 'select').and.callFake(() => of(stateWithMistakes));

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should select mistakes from store', () => {
      expect(store.select).toHaveBeenCalled();
    });
  });
});
