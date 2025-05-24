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
      inventoryQuantity: [0, [Validators.required, Validators.min(0)]],
      inventoryQuantityType: ['', Validators.required],
      minimumStockLevel: [0, [Validators.required, Validators.min(0)]],
      maximumStockLevel: [0, [Validators.required, Validators.min(0)]],
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
      inventoryQuantity: 0,
      inventoryQuantityType: '' as InventoryQuantityTypeEnum,
      minimumStockLevel: 0,
      maximumStockLevel: 0,
    };
  }

  onSubmit() {
    if (this.inventoryForm.invalid) return;

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
}
