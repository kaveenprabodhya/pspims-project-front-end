import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupplierStatusEnum } from '../../../../shared/enums/supplier-status-enum';
import { SupplierPaymentTermsEnum } from '../../../../shared/enums/supplier-payment-terms-enum';
import { Supplier } from '../../models/supplier.model';
import { SupplierService } from '../../services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../../../agent/models/agent.model';

@Component({
  selector: 'app-supplier-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css',
})
export class SupplierFormComponent {
  supplierForm!: FormGroup;

  supplierStatusOptions = Object.values(SupplierStatusEnum);
  supplierPaymentTermsOptions = Object.values(SupplierPaymentTermsEnum);

  isEditMode = false;
  supplier: Supplier = this.initEmptySupplier();

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.supplierForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      supplierStatus: ['', Validators.required],
      supplierPaymentTerms: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.supplierService.selectedSupplier$.subscribe((data) => {
          if (data && data.id === id) {
            this.supplier = { ...data };
            this.supplierForm.patchValue(data);
          } else {
            this.supplierService.getById(id).subscribe((fetchedData) => {
              this.supplier = { ...fetchedData };
              this.supplierService.setSelectedSupplier(fetchedData);
            });
          }
        });
      } else {
        this.isEditMode = false;
        this.supplierService.clearSelectedSupplier();
      }
    });
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.supplierService.selectedSupplier$.subscribe((data) => {
        if (data) {
          this.supplier = { ...data };
        } else {
          this.supplierService.getById(id).subscribe((fetchedData) => {
            this.supplier = { ...fetchedData };
            this.supplierService.setSelectedSupplier(fetchedData);
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.supplier = this.initEmptySupplier();
    }
  }

  initEmptySupplier(): Supplier {
    return {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      supplierStatus: '' as SupplierStatusEnum,
      supplierPaymentTerms: '' as SupplierPaymentTermsEnum,
      agent: null as any,
      supplierPaymentDetails: null as any,
      coconutPurchase: null as any,
    };
  }

  onSubmit() {
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      this.updateSupplier();
    } else {
      this.addSupplier();
    }
  }

  addSupplier() {
    const newSupplier: Supplier = this.supplierForm.value;
    this.supplierService.create(newSupplier).subscribe(() => {
      this.resetForm();
    });
  }

  updateSupplier() {
    if (!this.supplier.id) {
      console.error('No supplier ID for update');
      return;
    }

    const updatedSupplier: Supplier = this.supplierForm.value;
    this.supplierService.update(this.supplier.id, updatedSupplier).subscribe({
      next: () => {
        this.resetForm();
      },
      error: (err) => {
        console.error('Failed to update supplier:', err);
      },
    });
  }

  resetForm() {
    this.supplier = this.initEmptySupplier();
    this.supplierForm.reset();
    this.supplierService.triggerRefresh();
    this.supplierService.clearSelectedSupplier();
    this.router.navigate(['admin/dashboard/supplier/list']);
  }

  getFormErrors(form: FormGroup = this.supplierForm, parentKey: string = ''): string[] {
    const errors: string[] = [];
  
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      const controlPath = parentKey ? `${parentKey}.${key}` : key;
  
      if (control instanceof FormGroup) {
        errors.push(...this.getFormErrors(control, controlPath));
      } else if (control && control.invalid && (control.dirty || control.touched)) {
        const controlErrors = control.errors;
        if (controlErrors) {
          Object.keys(controlErrors).forEach((errorKey) => {
            const fieldName = this.formatFieldName(controlPath);
            let message = `${fieldName}: ${errorKey}`;
  
            // Custom error messages
            if (errorKey === 'required') {
              message = `${fieldName} is required.`;
            } else if (errorKey === 'email') {
              message = `${fieldName} must be a valid email address.`;
            } else if (errorKey === 'minlength') {
              message = `${fieldName} is too short.`;
            } else if (errorKey === 'maxlength') {
              message = `${fieldName} is too long.`;
            } else if (errorKey === 'pattern') {
              message = `${fieldName} format is invalid.`;
            }
  
            errors.push(message);
          });
        }
      }
    });
  
    return errors;
  }
   

  private formatFieldName(fieldPath: string): string {
    return fieldPath
      .split('.')
      .map(part =>
        part
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim()
      )
      .join(' > ');
  }
  
}
