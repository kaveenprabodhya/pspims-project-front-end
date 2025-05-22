import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { Order } from '../../models/order.model';
import { OrderStatusEnum } from '../../../../shared/enums/order-status-enum';
import { CoconutWaterProdOrder } from '../../../coconutwater-prod-order/models/coconutwater-prod-order.model';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  imports: [TableComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  orders: any[] = [];

  constructor(private orderService: OrderService, private router: Router) {
    
  }

  ngOnInit(): void {
    const rawOrders: Order[] = [
      {
        id: 'o1',
        orderDate: '2025-05-20',
        orderStatus: OrderStatusEnum.CONFIRMED,
        paymentDetails: {
          id: 'wertsdfg',
          paymentAmount: 2500,
          paymentDate: '2025-05-21',
          paymentMethod: 'CASH',
          paymentStatus: 'PAID',
          invoiceNo: 'INV-123',
        } as any,
        coconutWaterProdOrder: {
          id: 'qwerthgfds'
        } as CoconutWaterProdOrder,
        customer: {
          id: 'bgfdzsdf',
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice@example.com',
          address: 'City Road',
          customerType: 'INDIVIDUAL',
          creditLimit: 1000,
        } as any,
        shippingPlan: {
          id: 'pfdsfds',
          shippingAddress: 'Warehouse 12',
          shippingDate: '2025-05-22',
          shippingType: 'AIR',
          shippingStatus: 'PENDING',
          deliveryType: 'PICKUP',
        } as any,
      },
    ];

    this.orders = rawOrders.map(o => ({
      ...o,
      customerName: `${o.customer.firstName ?? ''} ${o.customer.lastName ?? ''}`.trim(),
      paymentAmount: o.paymentDetails.paymentAmount,
      shippingAddress: o.shippingPlan.shippingAddress,
    }));
  }

  onEdit(order: any) {
    this.orderService.setSelectedOrder(order);
    this.router.navigate(['admin/dashboard/order/form', order.id]);
  }

  onDelete(order: any) {
    console.log('Delete Order:', order);
  }
}
