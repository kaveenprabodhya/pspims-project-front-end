import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierStatusEnum } from '../../../../shared/enums/supplier-status-enum';
import { SupplierPaymentTermsEnum } from '../../../../shared/enums/supplier-payment-terms-enum';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent {
  supplierForm!: FormGroup;

  supplierStatusOptions = Object.values(SupplierStatusEnum);
  supplierPaymentTermsOptions = Object.values(SupplierPaymentTermsEnum);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      supplierStatus: ['', Validators.required],
      supplierPaymentTerms: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const newSupplier: Supplier = this.supplierForm.value;
      console.log('Supplier saved:', newSupplier);
      // TODO: Submit to API or emit output
    }
  }
}
