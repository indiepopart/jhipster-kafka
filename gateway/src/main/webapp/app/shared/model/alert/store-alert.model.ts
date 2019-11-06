import { Moment } from 'moment';

export interface IStoreAlert {
  id?: number;
  storeName?: string;
  storeStatus?: string;
  timestamp?: Moment;
}

export class StoreAlert implements IStoreAlert {
  constructor(public id?: number, public storeName?: string, public storeStatus?: string, public timestamp?: Moment) {}
}
