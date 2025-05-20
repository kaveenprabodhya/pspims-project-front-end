import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeverageProdOrderPageComponent } from './pages/beverage-prod-order-page/beverage-prod-order-page.component';

const routes: Routes = [
  { path: '', component: BeverageProdOrderPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeverageProdOrderRoutingModule { }
