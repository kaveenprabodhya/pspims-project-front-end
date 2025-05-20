import { Component } from '@angular/core';
import { CustomerListComponent } from "../../components/customer-list/customer-list.component";
import { CustomerFormComponent } from "../../components/customer-form/customer-form.component";

@Component({
  selector: 'app-customer-page',
  imports: [CustomerListComponent, CustomerFormComponent],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent {

}
