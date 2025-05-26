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
import { Order } from '../../models/order.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { DeliveryVehicleService } from '../../../delivery-vehicle/services/delivery-vehicle.service';
import { CustomerService } from '../../../customer/services/customer.service';
import { ShippingPlanService } from '../../../shipping-plan/services/shipping-plan.service';
import { PaymentDetailsService } from '../../../payment-details/services/payment-details.service';
import { formatToDateOnly } from '../../../../shared/format-date';
import { filter, Observable } from 'rxjs';
import { BeverageTypeService } from '../../../beverage-type/services/beverage-type.service';
import { v4 as uuidv4 } from 'uuid';
import { CoconutwaterProdOrderService } from '../../../coconutwater-prod-order/services/coconutwater-prod-order.service';
import { VinegarProdOrderService } from '../../../vinegar-prod-order/services/vinegar-prod-order.service';
import { BeverageProdOrderService } from '../../../beverage-prod-order/services/beverage-prod-order.service';
import { ProdOrderDetailsService } from '../../../prod-order-details/services/prod-order-details.service';

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

  isEditMode = false;

  order: Order = this.initEmptyOrder();

  customerSelectControl = new FormControl<Customer | null>(null);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private deliveryVehicleService: DeliveryVehicleService,
    private customerService: CustomerService,
    private shippingPlanService: ShippingPlanService,
    private paymentDetailsService: PaymentDetailsService,
    private beverageTypeService: BeverageTypeService,
    private coconutWaterOrderService: CoconutwaterProdOrderService,
    private vinegarOrderService: VinegarProdOrderService,
    private beverageOrderService: BeverageProdOrderService,
    private prodOrderDetailsService: ProdOrderDetailsService
  ) {
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
        this.orderService.selectedOrder$.subscribe((data) => {
          if (data && data.id === id) {
            this.order = { ...data };

            this.loadOrderTypeForm(data);

            this.patchOrderForm();
          } else {
            this.orderService.getById(id).subscribe((order) => {
              this.order = order;
              this.loadOrderTypeForm(order);
              this.patchOrderForm();
            });
          }
        });

        if (this.isEditMode) {
          // this.showCustomerSearchForm = true;
          this.customerForm.get('customerType')?.disable();
        }
      } else {
        this.isEditMode = false;
        this.order = this.initEmptyOrder();
        this.orderService.clearSelectedOrder();
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });
    this.resetFormOnRoute();
  }

  private loadOrderTypeForm(data: Order): void {
    if (data.coconutWaterProdOrder) {
      this.orderForm
        .get('orderType')
        ?.setValue('CoconutWaterProdOrder', { emitEvent: true });
      this.orderForm
        .get('coconutWaterProdOrder')
        ?.patchValue(data.coconutWaterProdOrder);
    } else if (data.vinegarProdOrder) {
      this.orderForm
        .get('orderType')
        ?.setValue('VinegarProdOrder', { emitEvent: true });
      this.orderForm.get('vinegarProdOrder')?.patchValue(data.vinegarProdOrder);
    } else if (data.beverageProdOrder) {
      this.orderForm
        .get('orderType')
        ?.setValue('BeverageProdOrder', { emitEvent: true });
      this.orderForm
        .get('beverageProdOrder')
        ?.patchValue(data.beverageProdOrder);
    }
  }

  initEmptyOrder(): Order {
    return {
      id: '',
      orderDate: '',
      orderStatus: '' as OrderStatusEnum,
      paymentDetails: null as any,
      customer: null as any,
      shippingPlan: null as any,
    };
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
              this.order.shippingPlan?.deliveryVehicle?.id
            ) {
              const selectedVehicleId =
                this.order.shippingPlan.deliveryVehicle.id;

              const selectedVehicle = vehicles.content.find(
                (v) => v.id === selectedVehicleId
              );

              if (
                selectedVehicle &&
                !availableVehicles.find((v) => v.id === selectedVehicle.id)
              ) {
                availableVehicles.push(selectedVehicle);
              }

              this.shippingPlanForm.patchValue({
                deliveryVehicle: selectedVehicle,
              });
            }

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

        if (this.isEditMode && this.order.customer?.id) {
          const matchedCustomer = this.existingCustomers.find(
            (c) => c.id === this.order.customer.id
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

  private loadBeverageTypes(): void {
    this.beverageTypeService.getAll().subscribe({
      next: (response) => {
        let beverageTypes = response.content;

        if (this.isEditMode && this.order.beverageProdOrder?.beverageType?.id) {
          const selectedBeverageTypeId =
            this.order.beverageProdOrder.beverageType.id;

          const selectedBeverageType = beverageTypes.find(
            (bt) => bt.id === selectedBeverageTypeId
          );

          if (
            selectedBeverageType &&
            !beverageTypes.find((bt) => bt.id === selectedBeverageType.id)
          ) {
            beverageTypes.push(selectedBeverageType);
          }

          this.beverageProdOrderForm.patchValue({
            beverageType: selectedBeverageType,
          });
        }

        this.beverageTypes = beverageTypes;
      },
      error: (err) => {
        console.error('Failed to load beverage types', err);
      },
    });
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.orderService.selectedOrder$.subscribe((data) => {
        if (data) {
          this.order = { ...data };
          this.patchOrderForm();
        } else {
          this.orderService.getById(id).subscribe((order) => {
            this.order = order;
            this.loadCustomers();
            this.loadBeverageTypes();
            this.patchOrderForm();
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.order = this.initEmptyOrder();
    }
  }

  private patchOrderForm(): void {
    this.orderForm.patchValue({
      orderStatus: this.order.orderStatus,
      orderDate: formatToDateOnly(this.order.orderDate),
      customer: this.order.customer,
      beverageProdOrder: this.order.beverageProdOrder || null,
      coconutWaterProdOrder: this.order.coconutWaterProdOrder || null,
      vinegarProdOrder: this.order.vinegarProdOrder || null,
      shippingPlan: {
        ...this.order.shippingPlan,
        shippingDate: formatToDateOnly(this.order.shippingPlan.shippingDate),
      },
      paymentDetails: {
        ...this.order.paymentDetails,
        paymentDate: formatToDateOnly(this.order.paymentDetails.paymentDate),
        paymentAmount: this.order.paymentDetails.paymentAmount,
      },
    });
    this.beverageProdOrderForm.patchValue({ ...this.order.beverageProdOrder });
    this.beverageProdOrderDetailsForm.patchValue({
      ...this.order.beverageProdOrder?.prodOrderDetails,
      prodDate: formatToDateOnly(
        this.order.beverageProdOrder?.prodOrderDetails.prodDate || ''
      ),
    });
    this.coconutWaterProdOrderForm.patchValue({
      ...this.order.coconutWaterProdOrder,
    });
    this.coconutWaterProdOrderDetailsForm.patchValue({
      ...this.order.coconutWaterProdOrder?.prodOrderDetails,
    });
    this.vinegarProdOrderForm.patchValue({ ...this.order.vinegarProdOrder });
    this.vinegarProdOrderDetailsForm.patchValue({
      ...this.order.vinegarProdOrder?.prodOrderDetails,
    });
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

  onOrderTypeChange() {
    this.orderForm.get('orderType')?.valueChanges.subscribe((type) => {
      const all = [
        'coconutWaterProdOrder',
        'vinegarProdOrder',
        'beverageProdOrder',
      ];
      all.forEach((key) => {
        const form = this.orderForm.get(key) as FormGroup;

        form?.disable();

        const prodDetails = form?.get('prodOrderDetails') as FormGroup;

        prodDetails?.get('totalAmount')?.setValue(0, { emitEvent: false });
      });

      this.paymentDetailsForm
        .get('paymentAmount')
        ?.setValue('', { emitEvent: false });

      const activeKey = this.getActiveFormKey(type);

      if (activeKey) {
        const activeForm = this.orderForm.get(activeKey);
        activeForm?.enable();

        const prodDetails = activeForm?.get('prodOrderDetails');
        prodDetails?.valueChanges.subscribe((val) => {
          const total = val.prodQuantity * val.pricePerUnit;

          prodDetails.get('totalAmount')?.setValue(total, { emitEvent: false });

          this.paymentDetailsForm
            .get('paymentAmount')
            ?.setValue(total, { emitEvent: false });
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

  initCoconutWaterProdOrderForm(): FormGroup {
    return this.fb.group({
      prodOrderDetails: this.fb.group({
        prodDate: [null, Validators.required],
        prodQuantity: [null, [Validators.required, Validators.min(0.01)]],
        pricePerUnit: [null, [Validators.required, Validators.min(0.01)]],
        totalAmount: [{ value: 0, disabled: true }],
        productionQuantityMeasure: [[''], Validators.required],
        prodStatus: [[''], Validators.required],
      }),
    });
  }

  initVinegarProdOrderForm(): FormGroup {
    return this.fb.group({
      prodOrderDetails: this.fb.group({
        prodDate: [null, Validators.required],
        prodQuantity: [null, [Validators.required, Validators.min(0.01)]],
        pricePerUnit: [null, [Validators.required, Validators.min(0.01)]],
        totalAmount: [{ value: 0, disabled: true }],
        productionQuantityMeasure: [[''], Validators.required],
        prodStatus: [[''], Validators.required],
      }),
      fermentationType: [[''], Validators.required],
    });
  }

  initBeverageProdOrderForm(): FormGroup {
    return this.fb.group({
      prodOrderDetails: this.fb.group({
        prodDate: [null, Validators.required],
        prodQuantity: [null, [Validators.required, Validators.min(0.01)]],
        pricePerUnit: [null, [Validators.required, Validators.min(0.01)]],
        totalAmount: [{ value: 0, disabled: true }],
        productionQuantityMeasure: [[''], Validators.required],
        prodStatus: [[''], Validators.required],
      }),
      beverageType: [[null as any], Validators.required],
    });
  }

  initCustomerForm(): FormGroup {
    return this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      customerType: ['', Validators.required],
      creditLimit: [null, [Validators.min(0)]],
    });
  }

  initShippingPlanForm(): FormGroup {
    return this.fb.group({
      shippingAddress: ['', Validators.required],
      shippingDate: ['', Validators.required],
      shippingType: ['', Validators.required],
      shippingStatus: ['', Validators.required],
      deliveryType: ['', Validators.required],
      deliveryVehicle: [null, Validators.required],
      trackingNumber: [uuidv4()],
    });
  }

  initPaymentDetailsForm(): FormGroup {
    return this.fb.group({
      paymentStatus: ['', Validators.required],
      paymentDate: ['', Validators.required],
      paymentAmount: [
        { value: '', disabled: true },
        [Validators.required, Validators.min(0.01)],
      ],
      paymentMethod: ['', Validators.required],
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

  shippingTypeOptions = Object.values(ShippingTypeEnum);

  shippingStatusOptions = Object.values(ShippingStatusEnum);

  deliveryTypeOptions = Object.values(DeliveryTypeEnum);

  paymentStatusOptions = Object.values(PaymentStatusEnum);

  paymentMethodOptions = Object.values(PaymentMethodEnum);

  customerTypeOptions = Object.values(CustomerType);

  onSubmit() {
    const orderType = this.orderForm.get('orderType')?.value;

    if (!orderType) {
      this.orderForm.get('orderType')?.markAsTouched();
      return;
    }

    this.orderForm.markAllAsTouched();

    const subformName = this.getProductOrderControlName(orderType);
    const subform = this.orderForm.get(subformName) as FormGroup;

    if (subform) {
      subform.markAllAsTouched();
    } else {
      console.warn(`Subform "${subformName}" was not added to orderForm.`);
    }

    if (this.orderForm.invalid) {
      console.log('Form errors:', this.getFormErrors()); // <-- For debug
      return;
    }

    if (this.isEditMode) {
      this.updateOrder();
    } else {
      this.addOrder();
    }
  }

  addOrder() {
    const formValue = this.orderForm.getRawValue();
    const orderType = formValue.orderType;

    delete formValue.customerMode;
    delete formValue.orderType;

    const shippingPlan = {
      ...formValue.shippingPlan,
      shippingDate: formatToDateOnly(formValue.shippingPlan.shippingDate),
      deliveryVehicle: formValue.shippingPlan.deliveryVehicle || null,
    };

    const paymentDetails = {
      ...formValue.paymentDetails,
      paymentDate: formatToDateOnly(formValue.paymentDetails.paymentDate),
      paymentAmount: Number(formValue.paymentDetails.paymentAmount),
    };

    let prodOrderDetails: any;
    let productOrder: any;
    let createProdOrderDetails: (pod: any) => Observable<any> = (pod) =>
      this.prodOrderDetailsService.create(pod);
    let createProductOrder: ((po: any) => Observable<any>) | undefined;
    let assignProductOrder: (order: Order, po: any) => void;

    switch (orderType) {
      case 'CoconutWaterProdOrder':
        prodOrderDetails = formValue.coconutWaterProdOrder.prodOrderDetails;
        productOrder = { ...formValue.coconutWaterProdOrder };
        createProductOrder = (po) => this.coconutWaterOrderService.create(po);
        assignProductOrder = (order, po) => (order.coconutWaterProdOrder = po);
        break;

      case 'VinegarProdOrder':
        prodOrderDetails = formValue.vinegarProdOrder.prodOrderDetails;
        productOrder = { ...formValue.vinegarProdOrder };
        createProductOrder = (po) => this.vinegarOrderService.create(po);
        assignProductOrder = (order, po) => (order.vinegarProdOrder = po);
        break;

      case 'BeverageProdOrder':
        prodOrderDetails = formValue.beverageProdOrder.prodOrderDetails;
        productOrder = { ...formValue.beverageProdOrder };
        createProductOrder = (po) => this.beverageOrderService.create(po);
        assignProductOrder = (order, po) => (order.beverageProdOrder = po);
        break;

      default:
        console.error('Invalid order type:', orderType);
        return;
    }

    if (!createProductOrder) {
      console.error(
        'Product order service function not set for orderType:',
        orderType
      );
      return;
    }

    this.customerService.getById(formValue.customer.id).subscribe({
      next: (customer) => {
        this.shippingPlanService.create(shippingPlan).subscribe({
          next: (savedShippingPlan) => {
            this.paymentDetailsService.create(paymentDetails).subscribe({
              next: (savedPaymentDetails) => {
                createProdOrderDetails(prodOrderDetails).subscribe({
                  next: (savedProdOrderDetails) => {
                    productOrder.prodOrderDetails = savedProdOrderDetails;

                    createProductOrder(productOrder).subscribe({
                      next: (savedProductOrder) => {
                        const orderToSave: Order = {
                          orderDate: formatToDateOnly(formValue.orderDate),
                          orderStatus: formValue.orderStatus,
                          customer,
                          shippingPlan: savedShippingPlan,
                          paymentDetails: savedPaymentDetails,
                          coconutWaterProdOrder: undefined,
                          vinegarProdOrder: undefined,
                          beverageProdOrder: undefined,
                        };

                        assignProductOrder(orderToSave, savedProductOrder);

                        this.orderService.create(orderToSave).subscribe({
                          next: () => this.resetForm(),
                          error: (err) =>
                            console.error('Failed to create Order', err),
                        });
                      },
                      error: (err) =>
                        console.error('Failed to create Product Order', err),
                    });
                  },
                  error: (err) =>
                    console.error('Failed to create ProdOrderDetails', err),
                });
              },
              error: (err) =>
                console.error('Failed to create PaymentDetails', err),
            });
          },
          error: (err) => console.error('Failed to create ShippingPlan', err),
        });
      },
      error: (err) => console.error('Failed to fetch Customer by ID', err),
    });
  }

  updateOrder() {
    const formValue = this.orderForm.getRawValue();
    const orderType = formValue.orderType;

    delete formValue.customerMode;
    delete formValue.orderType;

    const updatedShippingPlan = {
      ...this.order.shippingPlan,
      ...formValue.shippingPlan,
      shippingDate: formatToDateOnly(formValue.shippingPlan.shippingDate),
      deliveryVehicle: formValue.shippingPlan.deliveryVehicle || null,
    };

    const updatedPaymentDetails = {
      ...this.order.paymentDetails,
      ...formValue.paymentDetails,
      paymentDate: formatToDateOnly(formValue.paymentDetails.paymentDate),
      paymentAmount: Number(formValue.paymentDetails.paymentAmount),
    };

    let prodOrderDetails: any;
    let productOrder: any;
    let updateProdOrderDetails: (pod: any) => Observable<any> = (pod) =>
      this.prodOrderDetailsService.update(pod.id, pod);
    let updateProductOrder: ((po: any) => Observable<any>) | undefined;
    let assignProductOrder: (order: Order, po: any) => void;

    switch (orderType) {
      case 'CoconutWaterProdOrder':
        prodOrderDetails = {
          ...this.order.coconutWaterProdOrder?.prodOrderDetails,
          ...formValue.coconutWaterProdOrder.prodOrderDetails,
        };
        productOrder = {
          ...this.order.coconutWaterProdOrder,
          ...formValue.coconutWaterProdOrder,
        };
        updateProductOrder = (po) =>
          this.coconutWaterOrderService.update(po.id, po);
        assignProductOrder = (order, po) => (order.coconutWaterProdOrder = po);
        break;

      case 'VinegarProdOrder':
        prodOrderDetails = {
          ...this.order.vinegarProdOrder?.prodOrderDetails,
          ...formValue.vinegarProdOrder.prodOrderDetails,
        };
        productOrder = {
          ...this.order.vinegarProdOrder,
          ...formValue.vinegarProdOrder,
        };
        updateProductOrder = (po) => this.vinegarOrderService.update(po.id, po);
        assignProductOrder = (order, po) => (order.vinegarProdOrder = po);
        break;

      case 'BeverageProdOrder':
        prodOrderDetails = {
          ...this.order.beverageProdOrder?.prodOrderDetails,
          ...formValue.beverageProdOrder.prodOrderDetails,
        };
        productOrder = {
          ...this.order.beverageProdOrder,
          ...formValue.beverageProdOrder,
        };
        updateProductOrder = (po) => {
          return this.beverageOrderService.update(po.id, po);
        };
        assignProductOrder = (order, po) => (order.beverageProdOrder = po);
        break;

      default:
        console.error('Invalid order type:', orderType);
        return;
    }

    if (!updateProductOrder) {
      console.error(
        'Product order service function not set for orderType:',
        orderType
      );
      return;
    }

    this.customerService.getById(formValue.customer.id).subscribe({
      next: (customer) => {
        this.shippingPlanService
          .update(updatedShippingPlan.id, updatedShippingPlan)
          .subscribe({
            next: (savedShippingPlan) => {
              this.paymentDetailsService
                .update(updatedPaymentDetails.id, updatedPaymentDetails)
                .subscribe({
                  next: (savedPaymentDetails) => {
                    updateProdOrderDetails(prodOrderDetails).subscribe({
                      next: (updatedProdOrderDetails) => {
                        productOrder.prodOrderDetails = updatedProdOrderDetails;
                        updateProductOrder(productOrder).subscribe({
                          next: (updatedProductOrder) => {
                            const orderToUpdate: Order = {
                              ...this.order,
                              orderDate: formatToDateOnly(formValue.orderDate),
                              orderStatus: formValue.orderStatus,
                              customer: customer,
                              shippingPlan: savedShippingPlan,
                              paymentDetails: savedPaymentDetails,
                              coconutWaterProdOrder: null as any,
                              vinegarProdOrder: null as any,
                              beverageProdOrder: null as any,
                            };

                            assignProductOrder(
                              orderToUpdate,
                              updatedProductOrder
                            );

                            this.orderService
                              .update(orderToUpdate.id!, orderToUpdate)
                              .subscribe({
                                next: () => this.resetForm(),
                                error: (err) =>
                                  console.error('Failed to update Order', err),
                              });
                          },
                          error: (err) =>
                            console.error(
                              'Failed to update Product Order',
                              err
                            ),
                        });
                      },
                      error: (err) =>
                        console.error('Failed to update ProdOrderDetails', err),
                    });
                  },
                  error: (err) =>
                    console.error('Failed to update PaymentDetails', err),
                });
            },
            error: (err) => console.error('Failed to update ShippingPlan', err),
          });
      },
      error: (err) => console.error('Failed to fetch Customer by ID', err),
    });
  }

  resetForm() {
    this.order = this.initEmptyOrder();
    this.orderForm.reset();
    this.orderService.triggerRefresh();
    this.orderService.clearSelectedOrder();
    this.router.navigate(['admin/dashboard/order/list']);
  }

  private getProductOrderControlName(orderType: string): string {
    switch (orderType) {
      case 'CoconutWaterProdOrder':
        return 'coconutWaterProdOrder';
      case 'VinegarProdOrder':
        return 'vinegarProdOrder';
      case 'BeverageProdOrder':
        return 'beverageProdOrder';
      default:
        return '';
    }
  }

  setOrderType(type: string): void {
    this.orderForm.removeControl('coconutWaterProdOrder');
    this.orderForm.removeControl('vinegarProdOrder');
    this.orderForm.removeControl('beverageProdOrder');

    switch (type) {
      case 'CoconutWaterProdOrder':
        this.orderForm.addControl(
          'coconutWaterProdOrder',
          this.initCoconutWaterProdOrderForm()
        );
        break;
      case 'VinegarProdOrder':
        this.orderForm.addControl(
          'vinegarProdOrder',
          this.initVinegarProdOrderForm()
        );
        break;
      case 'BeverageProdOrder':
        this.orderForm.addControl(
          'beverageProdOrder',
          this.initBeverageProdOrderForm()
        );
        break;
    }
  }

  getFormErrors(
    form: FormGroup = this.orderForm,
    parentKey: string = ''
  ): string[] {
    const errors: string[] = [];

    const orderType = this.orderForm.get('orderType')?.value;

    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      const controlPath = parentKey ? `${parentKey}.${key}` : key;

      if (
        [
          'coconutWaterProdOrder',
          'vinegarProdOrder',
          'beverageProdOrder',
        ].includes(key) &&
        key !== this.getProductOrderControlName(orderType)
      ) {
        return;
      }

      if (control instanceof FormGroup) {
        errors.push(...this.getFormErrors(control, controlPath));
      } else if (
        control &&
        control.invalid &&
        (control.dirty || control.touched)
      ) {
        const controlErrors = control.errors;
        if (controlErrors) {
          Object.keys(controlErrors).forEach((errorKey) => {
            errors.push(`${this.formatFieldName(controlPath)}: ${errorKey}`);
          });
        }
      }
    });

    return errors;
  }

  private formatFieldName(fieldPath: string): string {
    return fieldPath
      .split('.')
      .map((part) =>
        part
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())
          .trim()
      )
      .join(' > ');
  }

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
