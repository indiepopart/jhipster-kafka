import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStore } from 'app/shared/model/store/store.model';

type EntityResponseType = HttpResponse<IStore>;
type EntityArrayResponseType = HttpResponse<IStore[]>;

@Injectable({ providedIn: 'root' })
export class StoreService {
  public resourceUrl = SERVER_API_URL + 'services/store/api/stores';

  constructor(protected http: HttpClient) {}

  create(store: IStore): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(store);
    return this.http
      .post<IStore>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(store: IStore): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(store);
    return this.http
      .put<IStore>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStore>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStore[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(store: IStore): IStore {
    const copy: IStore = Object.assign({}, store, {
      createTimestamp: store.createTimestamp != null && store.createTimestamp.isValid() ? store.createTimestamp.toJSON() : null,
      updateTimestamp: store.updateTimestamp != null && store.updateTimestamp.isValid() ? store.updateTimestamp.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createTimestamp = res.body.createTimestamp != null ? moment(res.body.createTimestamp) : null;
      res.body.updateTimestamp = res.body.updateTimestamp != null ? moment(res.body.updateTimestamp) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((store: IStore) => {
        store.createTimestamp = store.createTimestamp != null ? moment(store.createTimestamp) : null;
        store.updateTimestamp = store.updateTimestamp != null ? moment(store.updateTimestamp) : null;
      });
    }
    return res;
  }
}
