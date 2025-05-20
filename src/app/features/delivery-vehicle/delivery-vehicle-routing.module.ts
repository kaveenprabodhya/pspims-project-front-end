import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryVehiclePageComponent } from './pages/delivery-vehicle-page/delivery-vehicle-page.component';

const routes: Routes = [
  { path: '', component: DeliveryVehiclePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryVehicleRoutingModule { }
