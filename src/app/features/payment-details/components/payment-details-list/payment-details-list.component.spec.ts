import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsListComponent } from './payment-details-list.component';

describe('PaymentDetailsListComponent', () => {
  let component: PaymentDetailsListComponent;
  let fixture: ComponentFixture<PaymentDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetailsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
