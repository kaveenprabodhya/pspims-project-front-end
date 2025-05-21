import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerType } from '../../../../shared/enums/customer-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
  customerForm: FormGroup;
  customerTypes = Object.values(CustomerType);

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      customerType: ['', Validators.required],
      creditLimit: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const newCustomer = this.customerForm.value;
      console.log('Customer to save:', newCustomer);
      // Call your service to save this customer
    }
  }
}
