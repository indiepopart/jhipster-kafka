import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStoreAlert } from 'app/shared/model/alert/store-alert.model';

@Component({
  selector: 'jhi-store-alert-detail',
  templateUrl: './store-alert-detail.component.html'
})
export class StoreAlertDetailComponent implements OnInit {
  storeAlert: IStoreAlert;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ storeAlert }) => {
      this.storeAlert = storeAlert;
    });
  }

  previousState() {
    window.history.back();
  }
}
