import { Component } from '@angular/core';
import { SupplierListComponent } from "../../components/supplier-list/supplier-list.component";
import { SupplierFormComponent } from "../../components/supplier-form/supplier-form.component";

@Component({
  selector: 'app-supplier-page',
  imports: [SupplierListComponent, SupplierFormComponent],
  templateUrl: './supplier-page.component.html',
  styleUrl: './supplier-page.component.css'
})
export class SupplierPageComponent {

}
