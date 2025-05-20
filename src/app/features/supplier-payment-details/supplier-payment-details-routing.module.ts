import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierPaymentDetailsPageComponent } from './pages/supplier-payment-details-page/supplier-payment-details-page.component';

const routes: Routes = [
  { path: '', component: SupplierPaymentDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierPaymentDetailsRoutingModule { }
