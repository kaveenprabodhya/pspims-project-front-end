import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { PaymentDetails } from '../../../payment-details/models/payment-details.model';
import { ShippingPlan } from '../../../shipping-plan/models/shipping-plan.model';
import { CopraSale } from '../../models/copra-sale.model';
import { Customer } from '../../../customer/models/customer.model';

@Component({
  selector: 'app-copra-sale-list',
  imports: [TableComponent],
  templateUrl: './copra-sale-list.component.html',
  styleUrl: './copra-sale-list.component.css'
})
export class CopraSaleListComponent {

  copraSales: CopraSale[] = [
    {
      saleQuantity: 50,
      pricePerQuantity: 120.5,
      totalSaleAmount: 6025,
      saleDate: '2025-05-15',
      customer: null as any,
      shippingPlan: null as any,
      paymentDetails: null as any
    },
    {
      saleQuantity: 30,
      pricePerQuantity: 115.0,
      totalSaleAmount: 3450,
      saleDate: '2025-05-17',
      customer: null as any,
      shippingPlan: null as any,
      paymentDetails: null as any
    }
  ];

  onEdit(item: any) {
    console.log('Edit:', item);
  }

  onDelete(index: number) {
    console.log('Delete index:', index);
    this.copraSales.splice(index, 1);
  }
}
