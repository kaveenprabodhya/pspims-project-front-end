import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoconutPurchasePageComponent } from './pages/coconut-purchase-page/coconut-purchase-page.component';

const routes: Routes = [
  { path: '', component: CoconutPurchasePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoconutPurchaseRoutingModule { }
