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
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

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
          }
        });
      } else {
        this.isEditMode = false;
        this.inventory = this.initEmptyInventory();
        this.inventoryService.clearSelectedInventory();
      }
    });
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
    if (this.isEditMode) {
      this.updateInventory();
    } else {
      this.addInventory();
    }
  }

  addInventory() {
    console.log('Adding Inventory:', this.inventoryForm.value);
    this.resetForm();
  }

  updateInventory() {
    console.log('Updating Inventory:', this.inventoryForm.value);
    this.resetForm();
  }

  resetForm() {
    this.inventoryService.clearSelectedInventory();
    this.router.navigate(['admin/dashboard/inventory/list']);
  }
}
