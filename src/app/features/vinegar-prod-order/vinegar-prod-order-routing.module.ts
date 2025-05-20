import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VinegarProdOrderPageComponent } from './pages/vinegar-prod-order-page/vinegar-prod-order-page.component';

const routes: Routes = [
  { path: '', component: VinegarProdOrderPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VinegarProdOrderRoutingModule { }
