import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingPlanPageComponent } from './pages/shipping-plan-page/shipping-plan-page.component';

const routes: Routes = [
  { path: '', component: ShippingPlanPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingPlanRoutingModule { }
