import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { Inventory } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
  inventories: Inventory[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInventory(this.pageNumber);
    this.inventoryService.refreshInventory$.subscribe(() => {
      this.loadInventory(this.pageNumber);
    });
  }

  loadInventory(page: number): void {
    this.inventoryService.getAll(page, this.pageSize).subscribe(response => {
      this.inventories = response.content;

      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadInventory(page);
    }
  }

  onEdit(inventory: Inventory): void {
    this.inventoryService.setSelectedInventory(inventory);
    this.router.navigate(['admin/dashboard/inventory/form', inventory.id]);
  }

  onDelete(item: Inventory): void {
    if (confirm(`Delete inventory item of type ${item.inventoryItemType}?`)) {
      this.inventoryService.delete(item.id!).subscribe(() => {
        this.inventories = this.inventories.filter(i => i.id !== item.id);
      });
      this.inventoryService.triggerRefresh();
    }
  }
}
