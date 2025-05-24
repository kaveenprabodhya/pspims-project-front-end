import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
import { PaymentStatusEnum } from '../../../../shared/enums/payment-status-enum';
import { PaymentMethodEnum } from '../../../../shared/enums/payment-method-enum';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CopraSaleService } from '../../services/copra-sale.service';
import { CopraSale } from '../../models/copra-sale.model';
import { PaymentDetails } from '../../../payment-details/models/payment-details.model';
import { ShippingPlan } from '../../../shipping-plan/models/shipping-plan.model';
import { filter } from 'rxjs';
import { formatToDateOnly } from '../../../../shared/format-date';
import { DeliveryVehicleService } from '../../../delivery-vehicle/services/delivery-vehicle.service';
import { CustomerService } from '../../../customer/services/customer.service';
import { ShippingPlanService } from '../../../shipping-plan/services/shipping-plan.service';
import { PaymentDetailsService } from '../../../payment-details/services/payment-details.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-copra-sale-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './copra-sale-form.component.html',
  styleUrl: './copra-sale-form.component.css',
})
export class CopraSaleFormComponent {
  copraSaleForm: FormGroup;
  showCustomerForm = false;
  showCustomerSearchForm = true;

  existingCustomers: Customer[] = [];

  isEditMode = false;

  copraSale = this.initEmptyCopraSale();

  deliveryVehicles: DeliveryVehicle[] = [];

  customerSelectControl = new FormControl<Customer | null>(null);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private saleService: CopraSaleService,
    private deliveryVehicleService: DeliveryVehicleService,
    private customerService: CustomerService,
    private shippingPlanService: ShippingPlanService,
    private paymentDetailsService: PaymentDetailsService
  ) {
    this.copraSaleForm = this.fb.group({
      saleQuantity: [null, Validators.required],
      pricePerQuantity: [null, Validators.required],
      saleDate: [null, Validators.required],
      customer: this.initCustomerForm(),
      shippingPlan: this.initShippingPlanForm(),
      paymentDetails: this.initPaymentDetailsForm(),
    });

    // this.shippingPlanForm
    //   .get('deliveryType')
    //   ?.valueChanges.subscribe((type) => {
    //     const vehicleControl = this.shippingPlanForm.get('deliveryVehicle');
    //     if (type === DeliveryTypeEnum.PICKUP) {
    //       vehicleControl?.clearValidators();
    //       vehicleControl?.setValue(null);
    //     } else {
    //       vehicleControl?.setValidators([Validators.required]);
    //     }
    //     vehicleControl?.updateValueAndValidity();
    //   });

    this.copraSaleForm.get('pricePerQuantity')?.valueChanges.subscribe(() => {
      this.updatePaymentAmount();
    });

    this.copraSaleForm.get('saleQuantity')?.valueChanges.subscribe(() => {
      this.updatePaymentAmount();
    });
  }

  ngOnInit() {
    this.loadDeliveryVehicles();

    this.loadCustomers();

    this.customerSelectControl.valueChanges.subscribe(
      (selectedCustomer: Customer | null) => {
        if (selectedCustomer) {
          this.customerForm.patchValue({
            id: selectedCustomer.id,
            firstName: selectedCustomer.firstName,
            lastName: selectedCustomer.lastName,
            email: selectedCustomer.email,
            address: selectedCustomer.address,
            customerType: selectedCustomer.customerType,
            creditLimit: selectedCustomer.creditLimit,
          });
        }
      }
    );

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.saleService.selectedSale$.subscribe((data) => {
          if (data && data.id === id) {
            this.copraSale = { ...data };

            this.patchCopraSaleForm();
          } else {
            this.saleService.getById(id).subscribe((sale) => {
              this.copraSale = sale;
              this.saleService.setSelectedSale(sale);
              this.loadCustomers();
              this.loadDeliveryVehicles();
              this.patchCopraSaleForm();
            });
          }
        });

        if (this.isEditMode) {
          // this.showCustomerForm = true;
          this.showCustomerSearchForm = true;
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

  private loadDeliveryVehicles(): void {
    this.shippingPlanService.getAll().subscribe({
      next: (shippingPlans) => {
        const usedVehicleIds = new Set(
          shippingPlans.content
            .filter((sp) => sp.deliveryVehicle)
            .map((sp) => sp.deliveryVehicle?.id)
        );
  
        this.deliveryVehicleService.getAll().subscribe({
          next: (vehicles) => {
            let availableVehicles = vehicles.content.filter(
              (v) => !usedVehicleIds.has(v.id)
            );
  
            if (
              this.isEditMode &&
              this.copraSale.shippingPlan?.deliveryVehicle?.id
            ) {
              const selectedVehicleId =
                this.copraSale.shippingPlan.deliveryVehicle.id;
  
              const selectedVehicle = vehicles.content.find(
                (v) => v.id === selectedVehicleId
              );
  
              if (selectedVehicle && !availableVehicles.find(v => v.id === selectedVehicle.id)) {
                availableVehicles.push(selectedVehicle);
              }
  
              this.shippingPlanForm.patchValue({
                deliveryVehicle: selectedVehicle,
              });
            }
  
            // Step 4: Assign filtered list to component
            this.deliveryVehicles = availableVehicles;
          },
          error: (err) => {
            console.error('Failed to load delivery vehicles', err);
          },
        });
      },
      error: (err) => {
        console.error('Failed to load shipping plans', err);
      },
    });
  }
  

  private loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (response) => {
        this.existingCustomers = response.content;

        // If in edit mode and customer already selected, patch form
        if (this.isEditMode && this.copraSale.customer?.id) {
          const matchedCustomer = this.existingCustomers.find(
            (c) => c.id === this.copraSale.customer.id
          );

          if (matchedCustomer) {
            this.customerForm.patchValue({
              id: matchedCustomer.id,
              firstName: matchedCustomer.firstName,
              lastName: matchedCustomer.lastName,
              email: matchedCustomer.email,
              address: matchedCustomer.address,
              customerType: matchedCustomer.customerType,
              creditLimit: matchedCustomer.creditLimit,
            });
          }
          this.customerSelectControl.setValue(matchedCustomer ?? null);
        }
      },
      error: (err) => {
        console.error('Failed to load customers', err);
      },
    });
  }

  onSelectCustomer(customerId: string): void {
    const customer = this.existingCustomers.find((c) => c.id === customerId);
    if (customer) {
      this.customerForm.patchValue({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        address: customer.address,
        customerType: customer.customerType,
        creditLimit: customer.creditLimit,
      });
    }
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.saleService.selectedSale$.subscribe((data) => {
        if (data) {
          this.copraSale = { ...data };
          this.patchCopraSaleForm();
        } else {
          this.saleService.getById(id).subscribe((sale) => {
            this.copraSale = sale;
            this.saleService.setSelectedSale(sale);
            this.loadCustomers();
            this.loadDeliveryVehicles();
            this.patchCopraSaleForm();
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.copraSale = this.initEmptyCopraSale();
    }
  }

  private patchCopraSaleForm(): void {
    this.copraSaleForm.patchValue({
      saleQuantity: this.copraSale.saleQuantity,
      pricePerQuantity: this.copraSale.pricePerQuantity,
      saleDate: formatToDateOnly(this.copraSale.saleDate),
      customer: this.copraSale.customer,
      shippingPlan: {
        ...this.copraSale.shippingPlan,
        shippingDate: formatToDateOnly(
          this.copraSale.shippingPlan.shippingDate
        ),
      },
      paymentDetails: {
        ...this.copraSale.paymentDetails,
        paymentDate: formatToDateOnly(
          this.copraSale.paymentDetails.paymentDate
        ),
        paymentAmount: this.copraSale.totalSaleAmount,
      },
    });
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
      id: [''],
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
      trackingNumber: [uuidv4()],
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

  onSubmit() {
    if (this.copraSaleForm.invalid) return;

    if (this.isEditMode) {
      this.updateSale();
    } else {
      this.addSale();
    }
  }

  addSale() {
    const formValue = this.copraSaleForm.getRawValue();
  
    // Step 1: Prepare shippingPlan object
    const shippingPlan = {
      ...formValue.shippingPlan,
      shippingDate: formatToDateOnly(formValue.shippingPlan.shippingDate),
      deliveryVehicle: formValue.shippingPlan.deliveryVehicle || null,
    };
  
    // Step 2: Prepare paymentDetails object
    const paymentDetails = {
      ...formValue.paymentDetails,
      paymentDate: formatToDateOnly(formValue.paymentDetails.paymentDate),
      paymentAmount: Number(formValue.paymentDetails.paymentAmount),
    };

    console.log(paymentDetails);
    
  
    // Step 3: Fetch full Customer object by ID
    this.customerService.getById(formValue.customer.id).subscribe({
      next: (customer) => {
        // Step 4: Save shipping plan
        this.shippingPlanService.create(shippingPlan).subscribe({
          next: (savedShippingPlan) => {
            // Step 5: Save payment details
            this.paymentDetailsService.create(paymentDetails).subscribe({
              next: (savedPaymentDetails) => {
                // Step 6: Construct CopraSale
                const saleToSave: CopraSale = {
                  ...this.copraSale,
                  saleQuantity: formValue.saleQuantity,
                  pricePerQuantity: formValue.pricePerQuantity,
                  saleDate: formatToDateOnly(formValue.saleDate),
                  totalSaleAmount: Number(formValue.totalSaleAmount),
  
                  customer: customer, // full customer object from DB
                  shippingPlan: savedShippingPlan,
                  paymentDetails: savedPaymentDetails,
                };
  
                // Step 7: Save CopraSale
                this.saleService.create(saleToSave).subscribe({
                  next: (res) => {
                    console.log('Sale added successfully:', res);
                    this.resetForm();
                  },
                  error: (err) => {
                    console.error('Failed to save CopraSale', err);
                  }
                });
              },
              error: (err) => {
                console.error('Failed to save PaymentDetails', err);
              }
            });
          },
          error: (err) => {
            console.error('Failed to save ShippingPlan', err);
          }
        });
      },
      error: (err) => {
        console.error('Failed to fetch Customer by ID', err);
      }
    });
  }
  

  updateSale() {
    const saleToUpdate = this.prepareFormToSave();
    // console.log(saleToUpdate);
    
    if (!saleToUpdate.id) {
      console.error('Sale ID is missing. Cannot update.');
      return;
    }
    this.saleService.update(saleToUpdate.id, saleToUpdate).subscribe((res) => {
      console.log('Sale updated successfully:', res);
      this.resetForm();
    });
  }

  prepareFormToSave(): CopraSale {
    const formValue = this.copraSaleForm.getRawValue();
  
    return {
      ...this.copraSale,
      saleQuantity: formValue.saleQuantity,
      pricePerQuantity: formValue.pricePerQuantity,
      saleDate: formatToDateOnly(formValue.saleDate),
  
      totalSaleAmount: formValue.saleQuantity * formValue.pricePerQuantity,

      customer: {
        ...this.copraSale.customer,
        ...formValue.customer,
      },
  
      shippingPlan: {
        ...this.copraSale.shippingPlan,
        ...formValue.shippingPlan,
        shippingDate: formatToDateOnly(formValue.shippingPlan.shippingDate),
        deliveryVehicle: formValue.shippingPlan.deliveryVehicle ?? null,
      },
  
      paymentDetails: {
        ...this.copraSale.paymentDetails,
        ...formValue.paymentDetails,
        paymentDate: formatToDateOnly(formValue.paymentDetails.paymentDate),
      },
    };
  }
  
  resetForm() {
    this.copraSale = this.initEmptyCopraSale();
    this.copraSaleForm.reset();
    this.customerSelectControl.reset();
    this.saleService.clearSelectedSale();
    this.saleService.triggerRefresh();
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
