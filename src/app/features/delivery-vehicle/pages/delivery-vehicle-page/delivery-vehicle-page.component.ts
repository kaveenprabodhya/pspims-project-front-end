import { Component } from '@angular/core';
import { DeliveryVehicleListComponent } from "../../components/delivery-vehicle-list/delivery-vehicle-list.component";
import { DeliveryVehicleFormComponent } from "../../components/delivery-vehicle-form/delivery-vehicle-form.component";

@Component({
  selector: 'app-delivery-vehicle-page',
  imports: [DeliveryVehicleListComponent, DeliveryVehicleFormComponent],
  templateUrl: './delivery-vehicle-page.component.html',
  styleUrl: './delivery-vehicle-page.component.css'
})
export class DeliveryVehiclePageComponent {

}
