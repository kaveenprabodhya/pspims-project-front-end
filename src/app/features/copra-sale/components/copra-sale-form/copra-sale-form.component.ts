import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../../customer/models/customer.model';
import { CustomerType } from '../../../../shared/enums/customer-type';
import { ShippingTypeEnum } from '../../../../shared/enums/shipping-type-enum';
import { ShippingStatusEnum } from '../../../../shared/enums/shipping-status-enum';
import { DeliveryTypeEnum } from '../../../../shared/enums/delivery-type-enum';
import { DeliveryVehicle } from '../../../delivery-vehicle/models/delivery-vehicle.model';
import { VehicleTypeEnum } from '../../../../shared/enums/vehicle-type-enum.enum';
import { VehicleAvailabilityStatusEnum } from '../../../../shared/enums/vehicle-availability-status-enum';
import { PaymentStatusEnum } from '../../../../shared/enums/payment-status-enum';
import { PaymentMethodEnum } from '../../../../shared/enums/payment-method-enum';

@Component({
  selector: 'app-copra-sale-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './copra-sale-form.component.html',
  styleUrl: './copra-sale-form.component.css',
})
export class CopraSaleFormComponent {
  copraSaleForm: FormGroup;
  showCustomerForm = false;
  showCustomerSearchForm = false;
  existingCustomers: Customer[] = [];

  deliveryVehicles: DeliveryVehicle[] = [];

  loadDeliveryVehicles(): void {
    this.deliveryVehicles = [
      { id: '1', vehicleRegNo: 'ABC123', vehicleType: VehicleTypeEnum.AIRPLANE, availabilityStatus: VehicleAvailabilityStatusEnum.IN_USE },
    ];
  }

  constructor(private fb: FormBuilder) {
    this.copraSaleForm = this.fb.group({
      saleQuantity: [null, Validators.required],
      pricePerQuantity: [null, Validators.required],
      saleDate: [null, Validators.required],
      customer: this.initCustomerForm(),
      shippingPlan: this.initShippingPlanForm(),
      paymentDetails: this.initPaymentDetailsForm(),
    });
    this.loadCustomers();
    this.loadDeliveryVehicles();
    this.shippingPlanForm.get('deliveryType')?.valueChanges.subscribe(type => {
      const vehicleControl = this.shippingPlanForm.get('deliveryVehicle');
      if (type === DeliveryTypeEnum.PICKUP) {
        vehicleControl?.clearValidators();
        vehicleControl?.setValue(null); // Optional: clear selection
      } else {
        vehicleControl?.setValidators([Validators.required]);
      }
      vehicleControl?.updateValueAndValidity();
    });
  }

  initCustomerForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      address: [''],
      customerType: [''],
      creditLimit: [null],
    });
  }

  initShippingPlanForm(): FormGroup {
    return this.fb.group({
      shippingAddress: [''],
      shippingDate: [''],
      shippingType: [''],
      shippingStatus: [''],
      deliveryType: [''],
      deliveryVehicle: [null],
    });
  }

  initPaymentDetailsForm(): FormGroup {
    return this.fb.group({
      paymentStatus: [''],
      paymentDate: [''],
      paymentAmount: [null],
      paymentMethod: [''],
    });
  }

  toggleSection(section: string): void {
 
    if (section === 'customer') {
      if(this.showCustomerSearchForm) this.showCustomerSearchForm = false;
      if (!this.showCustomerForm) this.showCustomerForm = !this.showCustomerForm;
    } 
    
    if (section === 'customerSearch') {
      if(this.showCustomerForm) this.showCustomerForm = false;
      if (!this.showCustomerSearchForm) this.showCustomerSearchForm = !this.showCustomerSearchForm;
    }
  }

  shippingTypeOptions = Object.values(ShippingTypeEnum);

  shippingStatusOptions = Object.values(ShippingStatusEnum);
  
  deliveryTypeOptions = Object.values(DeliveryTypeEnum);

  paymentStatusOptions = Object.values(PaymentStatusEnum);

  paymentMethodOptions = Object.values(PaymentMethodEnum);

  customerTypeOptions = Object.values(CustomerType);

  submit() {
    if (this.copraSaleForm.valid) {
      console.log('Form Submitted', this.copraSaleForm.value);
    }
  }

  loadCustomers(): void {
    this.existingCustomers = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        address: 'NYC',
        customerType: CustomerType.INDIVIDUAL,
        creditLimit: 1000,
        agent: null as any,
      }, // add real data
    ];
  }

  onSelectCustomer(customerId: string): void {
    const customer = this.existingCustomers.find(c => c.id === customerId);
    if (customer) {
      this.customerForm.patchValue({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        address: customer.address,
        customerType: customer.customerType,
        creditLimit: customer.creditLimit
      });
    }
  }

  generateInvoNO(){}

  get customerForm(): FormGroup {
    return this.copraSaleForm.get('customer') as FormGroup;
  }

  get shippingPlanForm(): FormGroup {
    return this.copraSaleForm.get('shippingPlan') as FormGroup;
  }

  get paymentDetailsForm(): FormGroup {
    return this.copraSaleForm.get('paymentDetails') as FormGroup;
  }
}
