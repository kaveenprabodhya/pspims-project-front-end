import { Component } from '@angular/core';
import { InventoryListComponent } from "../../components/inventory-list/inventory-list.component";
import { InventoryFormComponent } from "../../components/inventory-form/inventory-form.component";

@Component({
  selector: 'app-inventory-page',
  imports: [InventoryListComponent, InventoryFormComponent],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.css'
})
export class InventoryPageComponent {

}
