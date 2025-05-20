import { Component } from '@angular/core';
import { PaymentDetailsListComponent } from "../../components/payment-details-list/payment-details-list.component";

@Component({
  selector: 'app-payment-details-page',
  imports: [PaymentDetailsListComponent],
  templateUrl: './payment-details-page.component.html',
  styleUrl: './payment-details-page.component.css'
})
export class PaymentDetailsPageComponent {

}
