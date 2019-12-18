import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreAlert } from 'app/shared/model/alert/store-alert.model';
import { StoreAlertService } from './store-alert.service';
import { StoreAlertComponent } from './store-alert.component';
import { StoreAlertDetailComponent } from './store-alert-detail.component';
import { StoreAlertUpdateComponent } from './store-alert-update.component';
import { IStoreAlert } from 'app/shared/model/alert/store-alert.model';

@Injectable({ providedIn: 'root' })
export class StoreAlertResolve implements Resolve<IStoreAlert> {
  constructor(private service: StoreAlertService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStoreAlert> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((storeAlert: HttpResponse<StoreAlert>) => storeAlert.body));
    }
    return of(new StoreAlert());
  }
}

export const storeAlertRoute: Routes = [
  {
    path: '',
    component: StoreAlertComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.alertStoreAlert.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StoreAlertDetailComponent,
    resolve: {
      storeAlert: StoreAlertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.alertStoreAlert.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StoreAlertUpdateComponent,
    resolve: {
      storeAlert: StoreAlertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.alertStoreAlert.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StoreAlertUpdateComponent,
    resolve: {
      storeAlert: StoreAlertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.alertStoreAlert.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
