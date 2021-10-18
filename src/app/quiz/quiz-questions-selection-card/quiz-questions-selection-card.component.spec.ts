import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import RADICALS from 'src/app/japanese/radical/radical.data';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import { QuizQuestionsSelectionCardComponent } from './quiz-questions-selection-card.component';

describe('QuizQuestionsSelectionCardComponent', () => {
  let component: QuizQuestionsSelectionCardComponent;
  let fixture: ComponentFixture<QuizQuestionsSelectionCardComponent>;
  let store: Store<AppStoreState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizQuestionsSelectionCardComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionsSelectionCardComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');

    component.currentCharacter = RADICALS[0];

    fixture.detectChanges();
    component.ngOnInit();
  });

  it('when select not preffered question should dispatch addPreferedQuestion action', () => {
    component.wasSelected = false;
    component.onSelect();

    expect(store.dispatch).toHaveBeenCalledWith(
      QuizActions.addPreferedQuestion({
        preferedQuestion: component.currentCharacter,
      })
    );
  });

  it('when select preffered question should dispatch removePreferedQuestion action', () => {
    component.wasSelected = true;
    component.onSelect();

    expect(store.dispatch).toHaveBeenCalledWith(
      QuizActions.removePreferedQuestion({
        preferedQuestionToRemove: component.currentCharacter,
      })
    );
  });
});
