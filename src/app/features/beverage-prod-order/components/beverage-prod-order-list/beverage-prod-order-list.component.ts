import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { BeverageProdOrder } from '../../models/beverage-prod-order.model';
import { BeverageProdOrderService } from '../../services/beverage-prod-order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beverage-prod-order-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './beverage-prod-order-list.component.html',
  styleUrl: './beverage-prod-order-list.component.css',
})
export class BeverageProdOrderListComponent {
  beverageProdOrders: BeverageProdOrder[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private beverageProdOrderService: BeverageProdOrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders(this.pageNumber);
    this.beverageProdOrderService.refreshOBeverageProdOrder$.subscribe(() => {
      this.loadOrders(this.pageNumber);
    });
  }

  loadOrders(page: number): void {
    this.beverageProdOrderService.getAll(page, this.pageSize).subscribe(response => {
      this.beverageProdOrders = response.content;
      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadOrders(page);
    }
  }

  onEdit(order: BeverageProdOrder): void {
  }

  onDelete(order: BeverageProdOrder): void {
  }
}
