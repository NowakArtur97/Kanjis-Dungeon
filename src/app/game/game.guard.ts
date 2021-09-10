import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

@Injectable()
export default class GameGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppStoreState>) {}

  private readonly LEVELS_PATH = 'levels';

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select('level').pipe(
      take(1),
      map(({ level }) => level),
      map((level) =>
        level ? true : this.router.createUrlTree([`/${this.LEVELS_PATH}`])
      )
    );
  }
}
