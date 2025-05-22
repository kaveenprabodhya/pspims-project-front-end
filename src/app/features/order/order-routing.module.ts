import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: OrderListComponent },
      { path: 'form', component: OrderFormComponent },
      { path: 'form/:id', component: OrderFormComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
