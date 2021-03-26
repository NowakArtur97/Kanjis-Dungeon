import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import KANJI from '../kanji.data';
import KanjiService from './kanji.service';

describe('kanjiService', () => {
  let injector: TestBed;
  let kanjiService: KanjiService;
  let httpMock: HttpTestingController;

  const BASE_URL = `${environment.firebaseConfig.databaseURL}/kanji.json`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KanjiService],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    kanjiService = injector.inject(KanjiService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('when save kanji', () => {
    it('should return kanji', () => {
      kanjiService.save(KANJI).subscribe((res) => {
        expect(res).toEqual(KANJI);
      });

      const req = httpMock.expectOne(BASE_URL);
      expect(req.request.method).toBe('PUT');
      req.flush(KANJI);
    });
  });

  describe('when get kanji', () => {
    it('should return kanji', () => {
      kanjiService.getAll().subscribe((res) => {
        expect(res).toEqual(KANJI);
      });

      const req = httpMock.expectOne(BASE_URL);
      expect(req.request.method).toBe('GET');
      req.flush(KANJI);
    });
  });
});
