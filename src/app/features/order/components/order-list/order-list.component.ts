import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  orders: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders(this.pageNumber);
    this.orderService.refreshOrders$.subscribe(() => {
      this.loadOrders(this.pageNumber);
    });
  }

  loadOrders(page: number): void {
    this.orderService.getAll(page, this.pageSize).subscribe({
      next: (response) => {
        this.orders = response.content.map(o => ({
          ...o,
          customerName: `${o.customer?.firstName ?? ''} ${o.customer?.lastName ?? ''}`.trim(),
          paymentAmount: o.paymentDetails?.paymentAmount,
          shippingAddress: o.shippingPlan?.shippingAddress,
        }));
        
        this.pageNumber = response.page.number;
        this.pageSize = response.page.size;
        this.totalPages = response.page.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadOrders(page);
    }
  }

  onEdit(order: any): void {
    this.orderService.setSelectedOrder(order);
    this.router.navigate(['admin/dashboard/order/form', order.id]);
  }

  onDelete(order: any): void {
    if (confirm(`Are you sure you want to delete order with ID ${order.id}?`)) {
      this.orderService.delete(order.id).subscribe(() => {
        this.orders = this.orders.filter(o => o.id !== order.id);
      });
      this.orderService.triggerRefresh();
    }
  }
}
