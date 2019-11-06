import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStore } from 'app/shared/model/store/store.model';
import { StoreService } from './store.service';

@Component({
  selector: 'jhi-store-delete-dialog',
  templateUrl: './store-delete-dialog.component.html'
})
export class StoreDeleteDialogComponent {
  store: IStore;

  constructor(protected storeService: StoreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.storeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'storeListModification',
        content: 'Deleted an store'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-store-delete-popup',
  template: ''
})
export class StoreDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ store }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StoreDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.store = store;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/store', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/store', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
