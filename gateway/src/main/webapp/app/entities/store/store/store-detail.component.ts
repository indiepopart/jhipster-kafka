import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStore } from 'app/shared/model/store/store.model';

@Component({
  selector: 'jhi-store-detail',
  templateUrl: './store-detail.component.html'
})
export class StoreDetailComponent implements OnInit {
  store: IStore;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ store }) => {
      this.store = store;
    });
  }

  previousState() {
    window.history.back();
  }
}
