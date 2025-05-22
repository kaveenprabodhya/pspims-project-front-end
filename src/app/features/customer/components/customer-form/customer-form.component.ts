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
            // Optionally: fetch by id from backend
            // this.purchaseService.getById(id).subscribe(p => this.purchase = p);
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
          // Optionally fetch by ID if someone typed the URL directly
        }
      });
    } else {
      this.isEditMode = false;
      this.customer = this.initEmptyCustomer();
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateCustomer();
    } else {
      this.addCustomer();
    }
  }

  addCustomer() {
    console.log('Adding customer:', this.customer);
    this.resetForm();
  }

  updateCustomer() {
    console.log('Updating customer:', this.customer);
    this.resetForm();
  }

  resetForm() {
    this.customer = this.initEmptyCustomer();
    this.customerService.clearSelectedCustomer();
    this.router.navigate(['admin/dashboard/customer/list']);
  }
}
