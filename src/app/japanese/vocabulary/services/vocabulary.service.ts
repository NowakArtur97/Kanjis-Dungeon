import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GenericFirebaseService from 'src/app/common/services/generic-firebase.service';

import Word from '../models/word.model';

@Injectable({ providedIn: 'root' })
export default class VocabularyService extends GenericFirebaseService<Word> {
  constructor(protected httpClient: HttpClient) {
    super('vocabulary', httpClient);
  }
}
