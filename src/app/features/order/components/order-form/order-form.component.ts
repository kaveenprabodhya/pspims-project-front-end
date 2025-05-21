import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderStatusEnum } from '../../../../shared/enums/order-status-enum';
import { ProductionQuantityMeasureEnum } from '../../../../shared/enums/production-quantity-measure-enum';
import { ProdStatusEnum } from '../../../../shared/enums/prod-status-enum';
import { FermentationTypeEnum } from '../../../../shared/enums/fermentation-type-enum';
import { BeverageType } from '../../../beverage-type/models/beverage-type.model';
import { ProdOrderDetailsFormComponent } from '../../../prod-order-details/components/prod-order-details-form/prod-order-details-form.component';
import { ShippingTypeEnum } from '../../../../shared/enums/shipping-type-enum';
import { ShippingStatusEnum } from '../../../../shared/enums/shipping-status-enum';
import { DeliveryTypeEnum } from '../../../../shared/enums/delivery-type-enum';
import { PaymentStatusEnum } from '../../../../shared/enums/payment-status-enum';
import { PaymentMethodEnum } from '../../../../shared/enums/payment-method-enum';
import { DeliveryVehicle } from '../../../delivery-vehicle/models/delivery-vehicle.model';
import { Customer } from '../../../customer/models/customer.model';
import { CustomerType } from '../../../../shared/enums/customer-type';
import { VehicleTypeEnum } from '../../../../shared/enums/vehicle-type-enum.enum';
import { VehicleAvailabilityStatusEnum } from '../../../../shared/enums/vehicle-availability-status-enum';

@Component({
  selector: 'app-order-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProdOrderDetailsFormComponent,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent {
  orderForm!: FormGroup;

  orderStatusOptions = Object.values(OrderStatusEnum);
  prodMeasureOptions = Object.values(ProductionQuantityMeasureEnum);
  prodStatusOptions = Object.values(ProdStatusEnum);
  fermentationTypeOptions = Object.values(FermentationTypeEnum);
  beverageTypes: BeverageType[] = [];
  deliveryVehicles: DeliveryVehicle[] = [];
  existingCustomers: Customer[] = [];
  selectedOrderType = '';
  showCustomerForm = false;
  showCustomerSearchForm = true;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      customerMode: ['existing'],
      orderType: ['', Validators.required],
      orderDate: ['', Validators.required],
      orderStatus: ['', Validators.required],
      coconutWaterProdOrder: this.initCoconutWaterProdOrderForm(),
      vinegarProdOrder: this.initVinegarProdOrderForm(),
      beverageProdOrder: this.initBeverageProdOrderForm(),
      paymentDetails: this.initPaymentDetailsForm(),
      customer: this.initCustomerForm(),
      shippingPlan: this.initShippingPlanForm(),
    });

    this.onFormValueChanges();
  }

  ngOnInit() {
    this.loadBeverageTypes();
    this.onOrderTypeChange();
    this.loadDeliveryVehicles();
    this.loadCustomers();
    this.shippingPlanForm
      .get('deliveryType')
      ?.valueChanges.subscribe((type) => {
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

  loadDeliveryVehicles(): void {
    this.deliveryVehicles = [
      {
        id: '1',
        vehicleRegNo: 'ABC123',
        vehicleType: VehicleTypeEnum.AIRPLANE,
        availabilityStatus: VehicleAvailabilityStatusEnum.IN_USE,
      },
    ];
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

  onOrderTypeChange() {
    this.orderForm.get('orderType')?.valueChanges.subscribe((type) => {
      const all = [
        'coconutWaterProdOrder',
        'vinegarProdOrder',
        'beverageProdOrder',
      ];
      all.forEach((key) => this.orderForm.get(key)?.disable());

      const activeKey = this.getActiveFormKey(type);
      if (activeKey) {
        const activeForm = this.orderForm.get(activeKey);
        activeForm?.enable();

        const prodDetails = activeForm?.get('prodOrderDetails');
        prodDetails?.valueChanges.subscribe((val) => {
          const total = val.prodQuantity * val.pricePerUnit;
          prodDetails.get('totalAmount')?.setValue(total, { emitEvent: false });
        });
      }
    });
  }

  getActiveFormKey(type: string): string | null {
    switch (type) {
      case 'CoconutWaterProdOrder':
        return 'coconutWaterProdOrder';
      case 'VinegarProdOrder':
        return 'vinegarProdOrder';
      case 'BeverageProdOrder':
        return 'beverageProdOrder';
      default:
        return null;
    }
  }

  loadBeverageTypes() {
    this.beverageTypes = [
      { id: '1', beverageName: 'Coconut Juice' } as BeverageType,
      { id: '2', beverageName: 'Coconut Shake' } as BeverageType,
    ];
  }

  initCoconutWaterProdOrderForm(): FormGroup {
    return this.fb.group({
      prodOrderDetails: this.fb.group({
        prodDate: [null, Validators.required],
        prodQuantity: [0, [Validators.required, Validators.min(0.01)]],
        pricePerUnit: [0, [Validators.required, Validators.min(0.01)]],
        totalAmount: [{ value: 0, disabled: true }], // auto-calculated
        productionQuantityMeasure: [[''], Validators.required],
        prodStatus: [[''], Validators.required],
        batchNumber: [{ value: '', disabled: true }], // UUID auto-gen
      }),
    });
  }

  initVinegarProdOrderForm(): FormGroup {
    return this.fb.group({
      prodOrderDetails: this.fb.group({
        prodDate: [null, Validators.required],
        prodQuantity: [0, [Validators.required, Validators.min(0.01)]],
        pricePerUnit: [0, [Validators.required, Validators.min(0.01)]],
        totalAmount: [{ value: 0, disabled: true }],
        productionQuantityMeasure: [[''], Validators.required],
        prodStatus: [[''], Validators.required],
        batchNumber: [{ value: '', disabled: true }],
      }),
      fermentationType: [[''], Validators.required],
    });
  }

  initBeverageProdOrderForm(): FormGroup {
    return this.fb.group({
      prodOrderDetails: this.fb.group({
        prodDate: [null, Validators.required],
        prodQuantity: [0, [Validators.required, Validators.min(0.01)]],
        pricePerUnit: [0, [Validators.required, Validators.min(0.01)]],
        totalAmount: [{ value: 0, disabled: true }],
        productionQuantityMeasure: [[''], Validators.required],
        prodStatus: [[''], Validators.required],
        batchNumber: [{ value: '', disabled: true }],
      }),
      beverageType: [[null as any], Validators.required],
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

  onFormValueChanges() {
    const prodDetails = this.orderForm.get('prodOrderDetails');
    prodDetails?.valueChanges.subscribe((val) => {
      const total = val.prodQuantity * val.pricePerUnit;
      prodDetails.get('totalAmount')?.setValue(total, { emitEvent: false });
    });
  }

  onSelectCustomer(customerId: string): void {
    const customer = this.existingCustomers.find((c) => c.id === customerId);
    if (customer) {
      this.customerForm.patchValue({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        address: customer.address,
        customerType: customer.customerType,
        creditLimit: customer.creditLimit,
      });
    }
  }

  shippingTypeOptions = Object.values(ShippingTypeEnum);

  shippingStatusOptions = Object.values(ShippingStatusEnum);

  deliveryTypeOptions = Object.values(DeliveryTypeEnum);

  paymentStatusOptions = Object.values(PaymentStatusEnum);

  paymentMethodOptions = Object.values(PaymentMethodEnum);

  customerTypeOptions = Object.values(CustomerType);

  submit() {}

  get coconutWaterProdOrderForm(): FormGroup {
    return this.orderForm.get('coconutWaterProdOrder') as FormGroup;
  }
  get coconutWaterProdOrderDetailsForm(): FormGroup {
    return this.orderForm.get(
      'coconutWaterProdOrder.prodOrderDetails'
    ) as FormGroup;
  }
  get vinegarProdOrderForm(): FormGroup {
    return this.orderForm.get('vinegarProdOrder') as FormGroup;
  }
  get vinegarProdOrderDetailsForm(): FormGroup {
    return this.orderForm.get('vinegarProdOrder.prodOrderDetails') as FormGroup;
  }
  get beverageProdOrderForm(): FormGroup {
    return this.orderForm.get('beverageProdOrder') as FormGroup;
  }
  get beverageProdOrderDetailsForm(): FormGroup {
    return this.orderForm.get(
      'beverageProdOrder.prodOrderDetails'
    ) as FormGroup;
  }
  get paymentDetailsForm(): FormGroup {
    return this.orderForm.get('paymentDetails') as FormGroup;
  }
  get shippingPlanForm(): FormGroup {
    return this.orderForm.get('shippingPlan') as FormGroup;
  }
  get customerForm(): FormGroup {
    return this.orderForm.get('customer') as FormGroup;
  }
  get customerMode() {
    return this.orderForm.get('customerMode')?.value;
  }
}
