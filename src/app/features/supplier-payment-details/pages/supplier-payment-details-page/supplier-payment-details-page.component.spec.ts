import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPaymentDetailsPageComponent } from './supplier-payment-details-page.component';

describe('SupplierPaymentDetailsPageComponent', () => {
  let component: SupplierPaymentDetailsPageComponent;
  let fixture: ComponentFixture<SupplierPaymentDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierPaymentDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierPaymentDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
