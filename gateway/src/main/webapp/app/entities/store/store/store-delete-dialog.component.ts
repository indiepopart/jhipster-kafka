import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStore } from 'app/shared/model/store/store.model';
import { StoreService } from './store.service';

@Component({
  templateUrl: './store-delete-dialog.component.html'
})
export class StoreDeleteDialogComponent {
  store: IStore;

  constructor(protected storeService: StoreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.storeService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'storeListModification',
        content: 'Deleted an store'
      });
      this.activeModal.dismiss(true);
    });
  }
}
