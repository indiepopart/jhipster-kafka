import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { StoreComponent } from './store.component';
import { StoreDetailComponent } from './store-detail.component';
import { StoreUpdateComponent } from './store-update.component';
import { StoreDeletePopupComponent, StoreDeleteDialogComponent } from './store-delete-dialog.component';
import { storeRoute, storePopupRoute } from './store.route';

const ENTITY_STATES = [...storeRoute, ...storePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [StoreComponent, StoreDetailComponent, StoreUpdateComponent, StoreDeleteDialogComponent, StoreDeletePopupComponent],
  entryComponents: [StoreDeleteDialogComponent]
})
export class StoreStoreModule {}
