import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryVehiclePageComponent } from './pages/delivery-vehicle-page/delivery-vehicle-page.component';
import { DeliveryVehicleListComponent } from './components/delivery-vehicle-list/delivery-vehicle-list.component';
import { DeliveryVehicleFormComponent } from './components/delivery-vehicle-form/delivery-vehicle-form.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryVehiclePageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: DeliveryVehicleListComponent },
      { path: 'form', component: DeliveryVehicleFormComponent },
      { path: 'form/:id', component: DeliveryVehicleFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryVehicleRoutingModule {}
