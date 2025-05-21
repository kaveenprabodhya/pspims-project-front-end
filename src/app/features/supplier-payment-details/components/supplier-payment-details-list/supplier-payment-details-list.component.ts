import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { SupplierPaymentDetails } from '../../models/supplier-payment-details.model';
import { PaymentDetails } from '../../../payment-details/models/payment-details.model';
import { Supplier } from '../../../supplier/models/supplier.model';

@Component({
  selector: 'app-supplier-payment-details-list',
  imports: [TableComponent],
  templateUrl: './supplier-payment-details-list.component.html',
  styleUrl: './supplier-payment-details-list.component.css'
})
export class SupplierPaymentDetailsListComponent {
  supplierPayments: SupplierPaymentDetails[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadSupplierPayments();
  }

  loadSupplierPayments(): void {
    const rawSupplierPayments = [
      {
        id: '1',
        paymentDetails: {
          paymentStatus: 'PAID',
          paymentDate: '2025-05-20',
          paymentAmount: 1500,
          invoiceNo: 'INV-001',
          paymentMethod: 'CREDIT_CARD'
        } as PaymentDetails,
        supplier: {
          id: 'sup1',
          firstName: 'Supplier',
          lastName: 'One',
          email: 'sup1@example.com',
          address: '',
        } as Supplier
      },
    ];

    this.supplierPayments = rawSupplierPayments.map(c => ({
      ...c,
      supplier: {
        ...c.supplier,
        name: `${c.supplier.firstName ?? ''} ${c.supplier.lastName ?? ''}`.trim()
      }
    }));
    
    
  }

  onEdit(item: SupplierPaymentDetails): void {
    console.log('Edit supplier payment', item);
  }

  onDelete(item: SupplierPaymentDetails): void {
    console.log('Delete supplier payment', item);
  }
}
