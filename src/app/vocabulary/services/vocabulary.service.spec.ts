import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.secret';

import VOCABULARY from '../vocabulary.data';
import VocabularyService from './vocabulary.service';

describe('vocabularyService', () => {
  let injector: TestBed;
  let vocabularyService: VocabularyService;
  let httpMock: HttpTestingController;

  const BASE_URL = `${environment.firebaseConfig.databaseURL}/vocabulary.json`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VocabularyService],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    vocabularyService = injector.inject(VocabularyService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('when save vocabulary', () => {
    it('should return vocabulary', () => {
      vocabularyService.save(VOCABULARY).subscribe((res) => {
        expect(res).toEqual(VOCABULARY);
      });

      const req = httpMock.expectOne(BASE_URL);
      expect(req.request.method).toBe('PUT');
      req.flush(VOCABULARY);
    });
  });

  describe('when get vocabulary', () => {
    it('should return vocabulary', () => {
      vocabularyService.getAll().subscribe((res) => {
        expect(res).toEqual(VOCABULARY);
      });

      const req = httpMock.expectOne(BASE_URL);
      expect(req.request.method).toBe('GET');
      req.flush(VOCABULARY);
    });
  });
});
