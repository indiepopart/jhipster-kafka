import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IStoreAlert } from 'app/shared/model/alert/store-alert.model';
import { AccountService } from 'app/core/auth/account.service';
import { StoreAlertService } from './store-alert.service';

@Component({
  selector: 'jhi-store-alert',
  templateUrl: './store-alert.component.html'
})
export class StoreAlertComponent implements OnInit, OnDestroy {
  storeAlerts: IStoreAlert[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected storeAlertService: StoreAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.storeAlertService
      .query()
      .pipe(
        filter((res: HttpResponse<IStoreAlert[]>) => res.ok),
        map((res: HttpResponse<IStoreAlert[]>) => res.body)
      )
      .subscribe((res: IStoreAlert[]) => {
        this.storeAlerts = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStoreAlerts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStoreAlert) {
    return item.id;
  }

  registerChangeInStoreAlerts() {
    this.eventSubscriber = this.eventManager.subscribe('storeAlertListModification', response => this.loadAll());
  }
}
