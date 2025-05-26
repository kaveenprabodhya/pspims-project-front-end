import { Component } from '@angular/core';
import { CoconutQualityGrade } from '../../../../shared/enums/coconut-quality-grade.enum';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoconutPurchase } from '../../models/coconut-purchase.model';
import { Supplier } from '../../../supplier/models/supplier.model';
import { Inventory } from '../../../inventory/models/inventory.model';
import { CoconutPurchaseService } from '../../services/coconut-purchase.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { formatToDateOnly } from '../../../../shared/format-date';
import { SupplierService } from '../../../supplier/services/supplier.service';
import { InventoryService } from '../../../inventory/services/inventory.service';

@Component({
  selector: 'app-coconut-purchase-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './coconut-purchase-form.component.html',
  styleUrl: './coconut-purchase-form.component.css',
})
export class CoconutPurchaseFormComponent {
  isEditMode = false;
  purchaseForm: FormGroup;

  purchase = this.initEmptyPurchase();

  coconutQualityGrades = Object.values(CoconutQualityGrade);

  suppliers: Supplier[] = [];

  inventories: Inventory[] = [];

  constructor(
    private fb: FormBuilder,
    private purchaseService: CoconutPurchaseService,
    private supplierService: SupplierService,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.purchaseForm = this.fb.group({
      purchaseQuantity: [null, [Validators.required, Validators.min(1)]],
      pricePerUnit: [null, [Validators.required, Validators.min(0)]],
      purchaseDate: ['', Validators.required],
      coconutQualityGrade: ['', Validators.required],
      supplier: [null, Validators.required],
      inventory: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadSuppliers();
    this.loadInventories();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.purchaseService.selectedPurchase$.subscribe((data) => {
          if (data && data.id === id) {
            this.purchase = { ...data };
            this.purchaseForm.patchValue({
              ...this.purchase,
              purchaseDate: formatToDateOnly(this.purchase.purchaseDate),
            });
          } else {
            this.loadPurchaseById(id);
          }
        });
      } else {
        this.isEditMode = false;
        this.purchase = this.initEmptyPurchase();
        this.purchaseForm.reset(this.purchase);
        this.purchaseService.clearSelectedPurchase();
      }
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });
    this.resetFormOnRoute();
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.purchaseService.selectedPurchase$.subscribe((data) => {
        if (data) {
          this.purchase = { ...data };
          this.purchaseForm.patchValue({
            ...this.purchase,
            purchaseDate: formatToDateOnly(this.purchase.purchaseDate),
          });
        } else {
          this.loadPurchaseById(id);
        }
      });
    } else {
      this.isEditMode = false;
      this.purchase = this.initEmptyPurchase();
    }
  }

  private loadSuppliers() {
    this.supplierService.getAll().subscribe({
      next: (data) => {
        this.suppliers = data.content;
        // If in edit mode and purchase already loaded, patch supplier control
        if (this.isEditMode && this.purchase.supplier?.id) {
          const matchedSupplier = this.suppliers.find(
            (s) => s.id === this.purchase.supplier.id
          );
          if (matchedSupplier) {
            this.purchaseForm.patchValue({ supplier: matchedSupplier });
          }
        }
      },
      error: (err) => console.error('Error loading suppliers', err),
    });
  }

  getSupplierFullName(supplier: Supplier): string {
    return `${supplier.firstName} ${supplier.lastName}`;
  }

  private loadInventories() {
    this.inventoryService.getAll().subscribe({
      next: (data) => {
        this.inventories = data.content;
        // If in edit mode and purchase already loaded, patch inventory control
        if (this.isEditMode && this.purchase.inventory?.id) {
          const matchedInventory = this.inventories.find(
            (i) => i.id === this.purchase.inventory.id
          );
          if (matchedInventory) {
            this.purchaseForm.patchValue({ inventory: matchedInventory });
          }
        }
      },
      error: (err) => console.error('Error loading inventories', err),
    });
  }

  loadPurchaseById(id: string) {
    this.purchaseService.getById(id).subscribe({
      next: (purchase) => {
        this.purchase = purchase;
        this.purchaseForm.patchValue({
          ...this.purchase,
          purchaseDate: formatToDateOnly(this.purchase.purchaseDate),
        });
        this.purchaseService.setSelectedPurchase(purchase);
        this.loadSuppliers();
        this.loadInventories();
      },
      error: (err) => {
        console.error('Failed to load purchase', err);
      },
    });
  }

  initEmptyPurchase(): CoconutPurchase {
    return {
      purchaseQuantity: null as any,
      pricePerUnit: null as any,
      purchaseDate: '',
      coconutQualityGrade: '' as CoconutQualityGrade,
      supplier: null as any,
      inventory: null as any,
    };
  }

  calculateTotalCost(): number {
    return (
      this.purchaseForm.value.purchaseQuantity *
      this.purchaseForm.value.pricePerUnit
    );
  }

  onSubmit() {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }  

    const formValue = this.purchaseForm.value;

    formValue.purchaseDate = new Date(formValue.purchaseDate).toISOString();

    this.purchase = { ...this.purchase, ...this.purchaseForm.value };

    if (this.isEditMode) {
      this.updatePurchase(this.purchase);
    } else {
      this.addPurchase(formValue);
    }
  }

  addPurchase(purchase: CoconutPurchase) {
    this.purchaseService.create(purchase).subscribe({
      next: () => {
        this.purchaseService.triggerRefresh();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding purchase', err);
      },
    });
  }

  updatePurchase(purchase: CoconutPurchase) {
    if (!purchase.id) {
      console.error('Purchase ID is missing for update');
      return;
    }

    this.purchaseService.update(purchase.id, purchase).subscribe({
      next: () => {
        this.purchaseService.triggerRefresh();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating purchase', err);
      },
    });
  }

  resetForm() {
    this.purchase = this.initEmptyPurchase();
    this.purchaseForm.reset(this.purchase);
    this.purchaseService.clearSelectedPurchase();
    this.purchaseService.triggerRefresh();
    this.router.navigate(['admin/dashboard/coconut-purchase/list']);
  }

  getFormErrors(): string[] {
    const errors: string[] = [];
    const controls = this.purchaseForm.controls;
  
    if (controls['purchaseQuantity'].touched && controls['purchaseQuantity'].errors) {
      if (controls['purchaseQuantity'].errors['required']) {
        errors.push('Purchase quantity is required.');
      }
      if (controls['purchaseQuantity'].errors['min']) {
        errors.push('Purchase quantity must be at least 1.');
      }
    }
  
    if (controls['pricePerUnit'].touched && controls['pricePerUnit'].errors) {
      if (controls['pricePerUnit'].errors['required']) {
        errors.push('Price per unit is required.');
      }
      if (controls['pricePerUnit'].errors['min']) {
        errors.push('Price per unit must be at least 0.');
      }
    }
  
    if (controls['purchaseDate'].touched && controls['purchaseDate'].errors) {
      if (controls['purchaseDate'].errors['required']) {
        errors.push('Purchase date is required.');
      }
    }
  
    if (controls['coconutQualityGrade'].touched && controls['coconutQualityGrade'].errors) {
      if (controls['coconutQualityGrade'].errors['required']) {
        errors.push('Coconut quality grade is required.');
      }
    }
  
    if (controls['supplier'].touched && controls['supplier'].errors) {
      if (controls['supplier'].errors['required']) {
        errors.push('Supplier selection is required.');
      }
    }
  
    if (controls['inventory'].touched && controls['inventory'].errors) {
      if (controls['inventory'].errors['required']) {
        errors.push('Inventory selection is required.');
      }
    }
  
    return errors;
  }
  
}
