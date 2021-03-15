import { HttpClient } from '@angular/common/http';
import GenericFirebaseService from 'src/app/common/services/generic-firebase.service';

import Word from '../models/word.model';

export default class VocabularyService extends GenericFirebaseService<Word> {
  constructor(protected httpClient: HttpClient) {
    super('vocabulary', httpClient);
  }
}
