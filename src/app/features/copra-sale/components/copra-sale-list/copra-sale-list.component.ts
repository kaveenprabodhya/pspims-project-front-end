import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CopraSale } from '../../models/copra-sale.model';
import { Router } from '@angular/router';
import { CopraSaleService } from '../../services/copra-sale.service';
import { Customer } from '../../../customer/models/customer.model';
import { ShippingPlan } from '../../../shipping-plan/models/shipping-plan.model';
import { PaymentDetails } from '../../../payment-details/models/payment-details.model';
import { CustomerType } from '../../../../shared/enums/customer-type';
import { DeliveryTypeEnum } from '../../../../shared/enums/delivery-type-enum';
import { ShippingStatusEnum } from '../../../../shared/enums/shipping-status-enum';
import { ShippingTypeEnum } from '../../../../shared/enums/shipping-type-enum';
import { PaymentStatusEnum } from '../../../../shared/enums/payment-status-enum';
import { PaymentMethodEnum } from '../../../../shared/enums/payment-method-enum';

@Component({
  selector: 'app-copra-sale-list',
  imports: [TableComponent],
  templateUrl: './copra-sale-list.component.html',
  styleUrl: './copra-sale-list.component.css',
})
export class CopraSaleListComponent {
  copraSales: CopraSale[] = [
    {
      id: '1',
      saleQuantity: 50,
      pricePerQuantity: 120.5,
      totalSaleAmount: 6025,
      saleDate: '2025-05-15',
      customer: {
        id: 'asdfgh',
        address: 'asdfgfdweresd',
        creditLimit: 1145,
        email: 'example@gmail.com',
        customerType: CustomerType.CORPORATE,
        firstName: 'John',
        lastName: 'Cooper',
      } as Customer,
      shippingPlan: {
        id: 'poiuyt',
        deliveryType: DeliveryTypeEnum.PICKUP,
        shippingAddress: 'qwertfghj',
        shippingStatus: ShippingStatusEnum.DELIVERED,
        shippingType: ShippingTypeEnum.AIR,
        shippingDate: '2025-10-12'
      } as ShippingPlan,
      paymentDetails: {
        id: 'zxcvbnm',
        invoiceNo: 'qwerty',
        paymentDate: '2025-12-12',
        paymentStatus: PaymentStatusEnum.PAID,
        paymentMethod: PaymentMethodEnum.CASH
      } as PaymentDetails,
    },
  ];

  constructor(
    private copraSaleService: CopraSaleService,
    private router: Router
  ) {}

  onEdit(item: CopraSale) {
    this.copraSaleService.setSelectedSale(item);
    this.router.navigate(['/admin/dashboard/copra-sale/form', item.id]);
  }

  onDelete(item: CopraSale) {}
}
