import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStoreAlert } from 'app/shared/model/alert/store-alert.model';
import { StoreAlertService } from './store-alert.service';

@Component({
  templateUrl: './store-alert-delete-dialog.component.html'
})
export class StoreAlertDeleteDialogComponent {
  storeAlert: IStoreAlert;

  constructor(
    protected storeAlertService: StoreAlertService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.storeAlertService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'storeAlertListModification',
        content: 'Deleted an storeAlert'
      });
      this.activeModal.dismiss(true);
    });
  }
}
