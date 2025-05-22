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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CopraSaleService } from '../../services/copra-sale.service';
import { CopraSale } from '../../models/copra-sale.model';
import { PaymentDetails } from '../../../payment-details/models/payment-details.model';
import { ShippingPlan } from '../../../shipping-plan/models/shipping-plan.model';
import { filter } from 'rxjs';

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
  isEditMode = false;

  copraSale = this.initEmptyCopraSale();

  deliveryVehicles: DeliveryVehicle[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private saleService: CopraSaleService
  ) {
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

    this.shippingPlanForm
      .get('deliveryType')
      ?.valueChanges.subscribe((type) => {
        const vehicleControl = this.shippingPlanForm.get('deliveryVehicle');
        if (type === DeliveryTypeEnum.PICKUP) {
          vehicleControl?.clearValidators();
          vehicleControl?.setValue(null);
        } else {
          vehicleControl?.setValidators([Validators.required]);
        }
        vehicleControl?.updateValueAndValidity();
      });

    this.copraSaleForm.get('pricePerQuantity')?.valueChanges.subscribe(() => {
      this.updatePaymentAmount();
    });

    this.copraSaleForm.get('saleQuantity')?.valueChanges.subscribe(() => {
      this.updatePaymentAmount();
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.saleService.selectedSale$.subscribe((data) => {
          if (data && data.id === id) {
            this.copraSale = { ...data };

            this.copraSaleForm.patchValue({
              saleQuantity: data.saleQuantity,
              pricePerQuantity: data.pricePerQuantity,
              saleDate: data.saleDate,
              customer: data.customer,
              shippingPlan: data.shippingPlan,
              paymentDetails: {
                ...data.paymentDetails,
                paymentAmount: data.totalSaleAmount, // if needed
              },
            });
          } else {
            // Optionally: fetch by id from backend
            // this.purchaseService.getById(id).subscribe(p => this.purchase = p);
          }
        });

        if (this.isEditMode) {
          this.showCustomerForm = true;
          this.customerForm.get('customerType')?.disable();
        }
      } else {
        this.isEditMode = false;
        this.copraSale = this.initEmptyCopraSale();
        this.saleService.clearSelectedSale();
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });
    this.resetFormOnRoute();
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

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.saleService.selectedSale$.subscribe((data) => {
        if (data) {
          this.copraSale = { ...data };
        } else {
          // Optionally fetch by ID if someone typed the URL directly
        }
      });
    } else {
      this.isEditMode = false;
      this.copraSale = this.initEmptyCopraSale();
    }
  }

  initEmptyCopraSale(): CopraSale {
    return {
      id: '',
      saleDate: '',
      saleQuantity: 0,
      paymentDetails: {} as PaymentDetails,
      pricePerQuantity: 0,
      totalSaleAmount: 0,
      shippingPlan: {} as ShippingPlan,
      customer: {} as Customer,
    };
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
      paymentAmount: [{ value: '', disabled: true }],
      paymentMethod: [''],
    });
  }

  updatePaymentAmount(): void {
    const quantity = this.copraSaleForm.get('saleQuantity')?.value;
    const price = this.copraSaleForm.get('pricePerQuantity')?.value;

    const total = quantity && price ? quantity * price : 0;
    this.paymentDetailsForm
      .get('paymentAmount')
      ?.setValue(total, { emitEvent: false });
  }

  toggleSection(section: string): void {
    if (section === 'customer') {
      if (this.showCustomerSearchForm) this.showCustomerSearchForm = false;
      if (!this.showCustomerForm)
        this.showCustomerForm = !this.showCustomerForm;
    }

    if (section === 'customerSearch') {
      if (this.showCustomerForm) this.showCustomerForm = false;
      if (!this.showCustomerSearchForm)
        this.showCustomerSearchForm = !this.showCustomerSearchForm;
    }
  }

  shippingTypeOptions = Object.values(ShippingTypeEnum);

  shippingStatusOptions = Object.values(ShippingStatusEnum);

  deliveryTypeOptions = Object.values(DeliveryTypeEnum);

  paymentStatusOptions = Object.values(PaymentStatusEnum);

  paymentMethodOptions = Object.values(PaymentMethodEnum);

  customerTypeOptions = Object.values(CustomerType);

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
      },
    ];
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

  generateInvoNO() {}

  onSubmit() {
    if (this.isEditMode) {
      this.updateSale();
    } else {
      this.addSale();
    }
  }

  addSale() {
    console.log('Adding sale:', this.copraSale);
    this.resetForm();
  }

  updateSale() {
    console.log('Updating sale:', this.copraSale);
    this.resetForm();
  }

  resetForm() {
    this.copraSale = this.initEmptyCopraSale();
    this.saleService.clearSelectedSale();
    this.router.navigate(['admin/dashboard/copra-sale/list']);
  }

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
