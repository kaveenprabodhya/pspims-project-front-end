import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InventoryItemTypeEnum } from '../../../../shared/enums/inventory-item-type-enum';
import { InventoryQuantityTypeEnum } from '../../../../shared/enums/inventory-quantity-type-enum';
import { Inventory } from '../../models/inventory.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-inventory-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.css',
})
export class InventoryFormComponent {
  inventoryForm: FormGroup;

  itemTypes = Object.values(InventoryItemTypeEnum);
  quantityTypes = Object.values(InventoryQuantityTypeEnum);

  isEditMode = false;
  inventory: Inventory = this.initEmptyInventory();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService
  ) {
    this.inventoryForm = this.fb.group({
      inventoryItemType: ['', Validators.required],
      inventoryQuantity: [null, [Validators.required, Validators.min(0)]],
      inventoryQuantityType: ['', Validators.required],
      minimumStockLevel: [null, [Validators.required, Validators.min(0)]],
      maximumStockLevel: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.inventoryService.selectedInventory$.subscribe((data) => {
          if (data && data.id === id) {
            this.inventory = { ...data };
            this.inventoryForm.patchValue({
              inventoryItemType: data.inventoryItemType,
              inventoryQuantity: data.inventoryQuantity,
              inventoryQuantityType: data.inventoryQuantityType,
              minimumStockLevel: data.minimumStockLevel,
              maximumStockLevel: data.maximumStockLevel,
            });
          } else {
            this.inventoryService.getById(id).subscribe((fetchedData) => {
              this.inventory = { ...fetchedData };
              this.inventoryService.setSelectedInventory(fetchedData);
            });
          }
        });
      } else {
        this.isEditMode = false;
        this.inventory = this.initEmptyInventory();
        this.inventoryService.clearSelectedInventory();
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
      this.inventoryService.selectedInventory$.subscribe((data) => {
        if (data) {
          this.inventory = { ...data };
        } else {
          this.inventoryService.getById(id).subscribe((fetchedData) => {
            this.inventory = { ...fetchedData };
            this.inventoryService.setSelectedInventory(fetchedData);
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.inventory = this.initEmptyInventory();
    }
  }

  initEmptyInventory(): Inventory {
    return {
      inventoryItemType: '' as InventoryItemTypeEnum,
      inventoryQuantity: null as any,
      inventoryQuantityType: '' as InventoryQuantityTypeEnum,
      minimumStockLevel: null as any,
      maximumStockLevel: null as any,
    };
  }

  onSubmit() {
    if (this.inventoryForm.invalid) {
      this.inventoryForm.markAllAsTouched();
      return;
    }

    const formValue = this.inventoryForm.value;

    if (this.isEditMode) {
      this.updateInventory();
    } else {
      this.addInventory();
    }
  }

  addInventory() {
    const newInventory: Inventory = this.inventoryForm.value;
    this.inventoryService.create(newInventory).subscribe(() => {
      this.resetForm();
    });
  }

  updateInventory() {
    if (!this.inventory.id) {
      console.error('No inventory ID for update');
      return;
    }

    const updatedInventory: Inventory = this.inventoryForm.value;
    this.inventoryService.update(this.inventory.id, updatedInventory).subscribe({
      next: () => {
        this.resetForm();
      },
      error: (err) => {
        console.error('Failed to update inventory:', err);
      },
    });
  }

  resetForm() {
    this.inventory = this.initEmptyInventory()
    this.inventoryService.clearSelectedInventory();
    this.inventoryService.triggerRefresh();
    this.router.navigate(['admin/dashboard/inventory/list']);
  }

  getFormErrors(form: FormGroup = this.inventoryForm, parentKey: string = ''): string[] {
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
