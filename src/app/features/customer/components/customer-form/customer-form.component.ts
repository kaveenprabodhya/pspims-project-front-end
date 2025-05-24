import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerType } from '../../../../shared/enums/customer-type';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent {
  customerForm: FormGroup;
  customerTypes = Object.values(CustomerType);
  isEditMode = false;
  customer = this.initEmptyCustomer();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      customerType: ['', Validators.required],
      creditLimit: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.customerService.selectedCustomer$.subscribe((data) => {
          if (data && data.id === id) {
            this.customer = { ...data };

            this.customerForm.patchValue({
              id: data.id,
              address: data.address,
              creditLimit: data.creditLimit,
              email: data.email,
              customerType: data.customerType,
              firstName: data.firstName,
              lastName: data.lastName,
            });
          } else {
            this.customerService.getById(id).subscribe((customer) => {
              this.customer = customer;
              this.customerForm.patchValue(customer);
              this.customerService.setSelectedCustomer(customer);
            });
          }
        });
      } else {
        this.isEditMode = false;
        this.customer = this.initEmptyCustomer();
        this.customerService.clearSelectedCustomer();
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });
    this.resetFormOnRoute();
  }

  initEmptyCustomer(): Customer {
    return {
      id: '',
      address: '',
      creditLimit: 0,
      email: '',
      customerType: '' as CustomerType,
      firstName: '',
      lastName: '',
    };
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.customerService.selectedCustomer$.subscribe((data) => {
        if (data) {
          this.customer = { ...data };
        } else {
          this.customerService.getById(id).subscribe((customer) => {
            this.customer = customer;
            this.customerForm.patchValue(customer);
            this.customerService.setSelectedCustomer(customer);
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.customer = this.initEmptyCustomer();
    }
  }

  onSubmit() {
    if (this.customerForm.invalid) return;

    this.customer = { ...this.customer, ...this.customerForm.value };

    if (this.isEditMode) {
      this.updateCustomer();
    } else {
      this.addCustomer();
    }
  }

  addCustomer() {
    this.customerService.create(this.customer).subscribe({
      next: (created) => {
        this.customerService.triggerRefresh();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding customer', err);
      },
    });
  }

  updateCustomer() {
    if (!this.customer.id) {
      console.error('Customer ID is missing for update');
      return;
    }
    this.customerService.update(this.customer.id, this.customer).subscribe({
      next: (updated) => {
        this.customerService.triggerRefresh();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating customer', err);
      },
    });
  }

  resetForm() {
    this.customer = this.initEmptyCustomer();
    this.customerForm.reset(this.customer);
    this.customerService.clearSelectedCustomer();
    this.customerService.triggerRefresh();
    this.router.navigate(['admin/dashboard/customer/list']);
  }
}
