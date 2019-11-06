import { Moment } from 'moment';
import { StoreStatus } from 'app/shared/model/enumerations/store-status.model';

export interface IStore {
  id?: number;
  name?: string;
  address?: string;
  status?: StoreStatus;
  createTimestamp?: Moment;
  updateTimestamp?: Moment;
}

export class Store implements IStore {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public status?: StoreStatus,
    public createTimestamp?: Moment,
    public updateTimestamp?: Moment
  ) {}
}
