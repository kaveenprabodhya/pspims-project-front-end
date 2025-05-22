import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierPageComponent } from './pages/supplier-page/supplier-page.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SupplierListComponent },
      { path: 'form', component: SupplierFormComponent },
      { path: 'form/:id', component: SupplierFormComponent },
    ],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
