import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CustomerListComponent },
      { path: 'form', component: CustomerFormComponent },
      { path: 'form/:id', component: CustomerFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
