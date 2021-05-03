import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import AppStoreState from '../../store/app.state';
import * as VocabularyActions from '../vocabulary/store/vocabulary.actions';
import Word from './models/word.model';

@Injectable({ providedIn: 'root' })
export default class VocabularyResolver
  implements Resolve<{ vocabulary: Word[] }> {
  constructor(private actions$: Actions, private store: Store<AppStoreState>) {}

  resolve = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | { vocabulary: Word[] }
    | Observable<{ vocabulary: Word[] }>
    | Promise<{ vocabulary: Word[] }> =>
    this.store.select('vocabulary').pipe(
      take(1),
      switchMap(({ vocabulary }) => {
        if (vocabulary.length === 0) {
          this.store.dispatch(VocabularyActions.fetchVocabulary());
          return this.actions$.pipe(
            ofType(VocabularyActions.setVocabulary),
            take(1)
          );
        } else {
          return of({ vocabulary });
        }
      })
    );
}
