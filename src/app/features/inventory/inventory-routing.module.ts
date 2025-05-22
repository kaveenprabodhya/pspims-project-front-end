import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';

const routes: Routes = [
  {
      path: '',
      component: InventoryPageComponent,
      children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: InventoryListComponent },
        { path: 'form', component: InventoryFormComponent },
        { path: 'form/:id', component: InventoryFormComponent },
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
