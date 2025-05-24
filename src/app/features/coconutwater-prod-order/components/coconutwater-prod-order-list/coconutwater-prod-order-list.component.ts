import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CoconutWaterProdOrder } from '../../models/coconutwater-prod-order.model';
import { CoconutwaterProdOrderService } from '../../services/coconutwater-prod-order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coconutwater-prod-order-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './coconutwater-prod-order-list.component.html',
  styleUrl: './coconutwater-prod-order-list.component.css',
})
export class CoconutwaterProdOrderListComponent {
  coconutWaterProdOrders: CoconutWaterProdOrder[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private coconutWaterProdOrderService: CoconutwaterProdOrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders(this.pageNumber);
    this.coconutWaterProdOrderService.refreshCoconutwaterProdOrder$.subscribe(() => {
      this.loadOrders(this.pageNumber);
    });
  }

  loadOrders(page: number): void {
    this.coconutWaterProdOrderService.getAll(page, this.pageSize).subscribe(response => {
      this.coconutWaterProdOrders = response.content;
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

  onEdit(order: CoconutWaterProdOrder): void {
  }

  onDelete(order: CoconutWaterProdOrder): void {
  }
}
