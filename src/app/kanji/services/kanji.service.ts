import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GenericFirebaseService from 'src/app/common/services/generic-firebase.service';

import Kanji from '../models/kanji.model';

@Injectable({ providedIn: 'root' })
export default class KanjiService extends GenericFirebaseService<Kanji> {
  constructor(protected httpClient: HttpClient) {
    super('kanji', httpClient);
  }
}
