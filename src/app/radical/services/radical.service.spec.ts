import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.secret';

import KANJI from '../radical.data';
import RadicalService from './radical.service';

describe('radicalService', () => {
  let injector: TestBed;
  let radicalService: RadicalService;
  let httpMock: HttpTestingController;

  const BASE_URL = `${environment.firebaseConfig.databaseURL}/radicals.json`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RadicalService],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    radicalService = injector.inject(RadicalService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('when save radicals', () => {
    it('should return radicals', () => {
      radicalService.save(KANJI).subscribe((res) => {
        expect(res).toEqual(KANJI);
      });

      const req = httpMock.expectOne(BASE_URL);
      expect(req.request.method).toBe('PUT');
      req.flush(KANJI);
    });
  });

  describe('when get radicals', () => {
    it('should return radicals', () => {
      radicalService.getAll().subscribe((res) => {
        expect(res).toEqual(KANJI);
      });

      const req = httpMock.expectOne(BASE_URL);
      expect(req.request.method).toBe('GET');
      req.flush(KANJI);
    });
  });
});
