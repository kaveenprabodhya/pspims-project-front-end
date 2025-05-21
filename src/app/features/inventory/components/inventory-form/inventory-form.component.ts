import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryItemTypeEnum } from '../../../../shared/enums/inventory-item-type-enum';
import { InventoryQuantityTypeEnum } from '../../../../shared/enums/inventory-quantity-type-enum';

@Component({
  selector: 'app-inventory-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.css'
})
export class InventoryFormComponent {
  inventoryForm: FormGroup;

  itemTypes = Object.values(InventoryItemTypeEnum);
  quantityTypes = Object.values(InventoryQuantityTypeEnum);

  constructor(private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      inventoryItemType: ['', Validators.required],
      inventoryQuantity: [null, [Validators.required, Validators.min(0)]],
      inventoryQuantityType: ['', Validators.required],
      minimumStockLevel: [null, [Validators.required, Validators.min(0)]],
      maximumStockLevel: [null, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {}
}
