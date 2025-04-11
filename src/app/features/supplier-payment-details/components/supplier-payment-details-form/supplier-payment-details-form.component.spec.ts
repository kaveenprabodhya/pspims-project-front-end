import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPaymentDetailsFormComponent } from './supplier-payment-details-form.component';

describe('SupplierPaymentDetailsFormComponent', () => {
  let component: SupplierPaymentDetailsFormComponent;
  let fixture: ComponentFixture<SupplierPaymentDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierPaymentDetailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierPaymentDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
