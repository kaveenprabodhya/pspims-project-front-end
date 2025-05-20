import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoconutwaterProdOrderPageComponent } from './pages/coconutwater-prod-order-page/coconutwater-prod-order-page.component';

const routes: Routes = [
  { path: '', component: CoconutwaterProdOrderPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoconutwaterProdOrderRoutingModule { }
