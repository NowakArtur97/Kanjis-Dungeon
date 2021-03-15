import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import AppStoreState from '../store/app.state';
import Kanji from './models/kanji.model';
import * as KanjiActions from './store/kanji.actions';

@Injectable({ providedIn: 'root' })
export default class KanjiResolver implements Resolve<{ kanji: Kanji[] }> {
  constructor(private actions$: Actions, private store: Store<AppStoreState>) {}

  resolve = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | { kanji: Kanji[] }
    | Observable<{ kanji: Kanji[] }>
    | Promise<{ kanji: Kanji[] }> =>
    this.store.select('kanji').pipe(
      take(1),
      switchMap(({ kanji }) => {
        if (kanji?.length === 0) {
          this.store.dispatch(KanjiActions.fetchKanji());
          return this.actions$.pipe(ofType(KanjiActions.setKanji), take(1));
        } else {
          return of({ kanji });
        }
      })
    );
}
