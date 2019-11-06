import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { StoreAlertComponent } from './store-alert.component';
import { StoreAlertDetailComponent } from './store-alert-detail.component';
import { StoreAlertUpdateComponent } from './store-alert-update.component';
import { StoreAlertDeletePopupComponent, StoreAlertDeleteDialogComponent } from './store-alert-delete-dialog.component';
import { storeAlertRoute, storeAlertPopupRoute } from './store-alert.route';

const ENTITY_STATES = [...storeAlertRoute, ...storeAlertPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StoreAlertComponent,
    StoreAlertDetailComponent,
    StoreAlertUpdateComponent,
    StoreAlertDeleteDialogComponent,
    StoreAlertDeletePopupComponent
  ],
  entryComponents: [StoreAlertDeleteDialogComponent]
})
export class AlertStoreAlertModule {}
