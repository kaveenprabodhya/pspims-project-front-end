import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdOrderDetailsPageComponent } from './pages/prod-order-details-page/prod-order-details-page.component';

const routes: Routes = [
  { path: '', component: ProdOrderDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdOrderDetailsRoutingModule { }
