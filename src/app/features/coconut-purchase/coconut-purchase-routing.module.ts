import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoconutPurchasePageComponent } from './pages/coconut-purchase-page/coconut-purchase-page.component';
import { CoconutPurchaseListComponent } from './components/coconut-purchase-list/coconut-purchase-list.component';
import { CoconutPurchaseFormComponent } from './components/coconut-purchase-form/coconut-purchase-form.component';

const routes: Routes = [
  {
    path: '',
    component: CoconutPurchasePageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CoconutPurchaseListComponent },
      { path: 'form', component: CoconutPurchaseFormComponent },
      { path: 'form/:id', component: CoconutPurchaseFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoconutPurchaseRoutingModule { }
