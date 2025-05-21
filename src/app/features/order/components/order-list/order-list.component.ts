import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { Order } from '../../models/order.model';
import { OrderStatusEnum } from '../../../../shared/enums/order-status-enum';

@Component({
  selector: 'app-order-list',
  imports: [TableComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  orders: any[] = [];

  ngOnInit(): void {
    const rawOrders: Order[] = [
      {
        id: 'o1',
        orderDate: '2025-05-20',
        orderStatus: OrderStatusEnum.CONFIRMED,
        paymentDetails: {
          paymentAmount: 2500,
          paymentDate: '2025-05-21',
          paymentMethod: 'CASH',
          paymentStatus: 'PAID',
          invoiceNo: 'INV-123',
        } as any,
        customer: {
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice@example.com',
          address: 'City Road',
          customerType: 'INDIVIDUAL',
          creditLimit: 1000,
        } as any,
        shippingPlan: {
          shippingAddress: 'Warehouse 12',
          shippingDate: '2025-05-22',
          shippingType: 'STANDARD',
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
    console.log('Edit Order:', order);
  }

  onDelete(order: any) {
    console.log('Delete Order:', order);
  }
}
