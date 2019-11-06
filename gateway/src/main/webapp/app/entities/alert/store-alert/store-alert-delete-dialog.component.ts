import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStoreAlert } from 'app/shared/model/alert/store-alert.model';
import { StoreAlertService } from './store-alert.service';

@Component({
  selector: 'jhi-store-alert-delete-dialog',
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
    this.storeAlertService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'storeAlertListModification',
        content: 'Deleted an storeAlert'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-store-alert-delete-popup',
  template: ''
})
export class StoreAlertDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ storeAlert }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StoreAlertDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.storeAlert = storeAlert;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/store-alert', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/store-alert', { outlets: { popup: null } }]);
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
