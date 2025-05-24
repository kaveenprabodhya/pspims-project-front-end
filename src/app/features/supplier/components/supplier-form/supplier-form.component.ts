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
      agent: {} as Agent,
      supplierPaymentDetails: [],
      coconutPurchase: [],
    };
  }

  onSubmit() {
    if (this.supplierForm.invalid) return;

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
}
