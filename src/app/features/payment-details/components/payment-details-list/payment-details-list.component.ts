import { PaymentStatusEnum } from './../../../../shared/enums/payment-status-enum';
import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { PaymentDetails } from '../../models/payment-details.model';
import { PaymentMethodEnum } from '../../../../shared/enums/payment-method-enum';

@Component({
  selector: 'app-payment-details-list',
  imports: [TableComponent],
  templateUrl: './payment-details-list.component.html',
  styleUrl: './payment-details-list.component.css'
})
export class PaymentDetailsListComponent {
  paymentDetailsList: PaymentDetails[] = [];

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentDetailsList = [
      {
        id: '1',
        paymentStatus: PaymentStatusEnum.UNPAID,
        paymentDate: '2025-05-20',
        paymentAmount: 500,
        invoiceNo: 'INV-2025-001',
        paymentMethod: PaymentMethodEnum.CASH,
      },
    ];
  }

  onEdit(payment: PaymentDetails): void {
    console.log('Edit Payment:', payment);
    // TODO: Open edit form/modal
  }

  onDelete(payment: PaymentDetails): void {
    console.log('Delete Payment:', payment);
    // TODO: Confirm and delete
  }

}
