import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { PaymentDetails } from '../../models/payment-details.model';
import { Router } from '@angular/router';
import { PaymentDetailsService } from '../../services/payment-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-details-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './payment-details-list.component.html',
  styleUrl: './payment-details-list.component.css'
})
export class PaymentDetailsListComponent {
  paymentDetailsList: PaymentDetails[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private paymentDetailsService: PaymentDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPayments(this.pageNumber);
    this.paymentDetailsService.refreshPaymentDetails$.subscribe(() => {
      this.loadPayments(this.pageNumber);
    });
  }

  loadPayments(page: number): void {
    this.paymentDetailsService.getAll(page, this.pageSize).subscribe(response => {
      this.paymentDetailsList = response.content;
      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    }, error => {
      console.error('Error loading payments:', error);
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadPayments(page);
    }
  }

  onEdit(payment: PaymentDetails): void {
  }

  onDelete(payment: PaymentDetails): void {
  }

}
