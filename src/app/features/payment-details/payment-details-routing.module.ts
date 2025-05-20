import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentDetailsPageComponent } from './pages/payment-details-page/payment-details-page.component';

const routes: Routes = [
  { path: '', component: PaymentDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentDetailsRoutingModule { }
