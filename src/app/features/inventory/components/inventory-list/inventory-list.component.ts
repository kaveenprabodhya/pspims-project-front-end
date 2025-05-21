import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { Inventory } from '../../models/inventory.model';
import { InventoryItemTypeEnum } from '../../../../shared/enums/inventory-item-type-enum';
import { InventoryQuantityTypeEnum } from '../../../../shared/enums/inventory-quantity-type-enum';

@Component({
  selector: 'app-inventory-list',
  imports: [TableComponent],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
  inventories: Inventory[] = [];

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventories = [
      {
        id: '1',
        inventoryItemType: InventoryItemTypeEnum.CONSUMABLE,
        inventoryQuantity: 500,
        inventoryQuantityType: InventoryQuantityTypeEnum.KILOGRAM,
        minimumStockLevel: 100,
        maximumStockLevel: 1000,
      },
      {
        id: '2',
        inventoryItemType: InventoryItemTypeEnum.CONSUMABLE,
        inventoryQuantity: 200,
        inventoryQuantityType: InventoryQuantityTypeEnum.LITER,
        minimumStockLevel: 50,
        maximumStockLevel: 500,
      },
    ];
  }

  onEdit(item: Inventory): void {
    console.log('Edit inventory:', item);
  }

  onDelete(item: Inventory): void {
    console.log('Delete inventory:', item);
  }


}
