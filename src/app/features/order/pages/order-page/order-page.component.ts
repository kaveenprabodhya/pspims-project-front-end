import { Component } from '@angular/core';
import { OrderListComponent } from "../../components/order-list/order-list.component";
import { OrderFormComponent } from "../../components/order-form/order-form.component";

@Component({
  selector: 'app-order-page',
  imports: [OrderListComponent, OrderFormComponent],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {

}
