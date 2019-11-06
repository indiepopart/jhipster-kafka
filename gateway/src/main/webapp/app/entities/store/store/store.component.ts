import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IStore } from 'app/shared/model/store/store.model';
import { AccountService } from 'app/core/auth/account.service';
import { StoreService } from './store.service';

@Component({
  selector: 'jhi-store',
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit, OnDestroy {
  stores: IStore[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected storeService: StoreService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.storeService
      .query()
      .pipe(
        filter((res: HttpResponse<IStore[]>) => res.ok),
        map((res: HttpResponse<IStore[]>) => res.body)
      )
      .subscribe((res: IStore[]) => {
        this.stores = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStores();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStore) {
    return item.id;
  }

  registerChangeInStores() {
    this.eventSubscriber = this.eventManager.subscribe('storeListModification', response => this.loadAll());
  }
}
