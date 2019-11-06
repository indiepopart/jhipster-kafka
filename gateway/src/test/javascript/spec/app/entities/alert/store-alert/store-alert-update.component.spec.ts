import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { StoreAlertUpdateComponent } from 'app/entities/alert/store-alert/store-alert-update.component';
import { StoreAlertService } from 'app/entities/alert/store-alert/store-alert.service';
import { StoreAlert } from 'app/shared/model/alert/store-alert.model';

describe('Component Tests', () => {
  describe('StoreAlert Management Update Component', () => {
    let comp: StoreAlertUpdateComponent;
    let fixture: ComponentFixture<StoreAlertUpdateComponent>;
    let service: StoreAlertService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [StoreAlertUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StoreAlertUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StoreAlertUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StoreAlertService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StoreAlert(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new StoreAlert();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
