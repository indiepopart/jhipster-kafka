import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { StoreService } from 'app/entities/store/store/store.service';
import { IStore, Store } from 'app/shared/model/store/store.model';
import { StoreStatus } from 'app/shared/model/enumerations/store-status.model';

describe('Service Tests', () => {
  describe('Store Service', () => {
    let injector: TestBed;
    let service: StoreService;
    let httpMock: HttpTestingController;
    let elemDefault: IStore;
    let expectedResult: IStore | IStore[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(StoreService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Store(0, 'AAAAAAA', 'AAAAAAA', StoreStatus.OPEN, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            createTimestamp: currentDate.format(DATE_TIME_FORMAT),
            updateTimestamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Store', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createTimestamp: currentDate.format(DATE_TIME_FORMAT),
            updateTimestamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createTimestamp: currentDate,
            updateTimestamp: currentDate
          },
          returnedFromService
        );
        service
          .create(new Store())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Store', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            address: 'BBBBBB',
            status: 'BBBBBB',
            createTimestamp: currentDate.format(DATE_TIME_FORMAT),
            updateTimestamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createTimestamp: currentDate,
            updateTimestamp: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Store', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            address: 'BBBBBB',
            status: 'BBBBBB',
            createTimestamp: currentDate.format(DATE_TIME_FORMAT),
            updateTimestamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createTimestamp: currentDate,
            updateTimestamp: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Store', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
