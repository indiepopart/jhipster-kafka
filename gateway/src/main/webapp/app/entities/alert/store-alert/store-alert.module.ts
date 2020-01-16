import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { StoreAlertComponent } from './store-alert.component';
import { StoreAlertDetailComponent } from './store-alert-detail.component';
import { StoreAlertUpdateComponent } from './store-alert-update.component';
import { StoreAlertDeleteDialogComponent } from './store-alert-delete-dialog.component';
import { storeAlertRoute } from './store-alert.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(storeAlertRoute)],
  declarations: [StoreAlertComponent, StoreAlertDetailComponent, StoreAlertUpdateComponent, StoreAlertDeleteDialogComponent],
  entryComponents: [StoreAlertDeleteDialogComponent]
})
export class AlertStoreAlertModule {}
