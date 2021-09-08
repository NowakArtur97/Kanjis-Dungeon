import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let store: Store<AppStoreState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      declarations: [NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');
  });

  describe('when change view', () => {
    it('should dispatch shouldShowSummary action', () => {
      fixture.detectChanges();
      component.ngOnInit();

      component.onChangeView();

      expect(store.dispatch).toHaveBeenCalledWith(
        QuizActions.shouldShowSummary({ shouldShowSummary: false })
      );
    });
  });
});
