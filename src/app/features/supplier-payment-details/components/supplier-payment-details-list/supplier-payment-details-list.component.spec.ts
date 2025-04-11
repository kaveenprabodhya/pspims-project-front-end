import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPaymentDetailsListComponent } from './supplier-payment-details-list.component';

describe('SupplierPaymentDetailsListComponent', () => {
  let component: SupplierPaymentDetailsListComponent;
  let fixture: ComponentFixture<SupplierPaymentDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierPaymentDetailsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierPaymentDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
