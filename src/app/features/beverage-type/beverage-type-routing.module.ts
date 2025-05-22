import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeverageTypePageComponent } from './pages/beverage-type-page/beverage-type-page.component';
import { BeverageTypeListComponent } from './components/beverage-type-list/beverage-type-list.component';
import { BeverageTypeFormComponent } from './components/beverage-type-form/beverage-type-form.component';

const routes: Routes = [
  {
    path: '',
    component: BeverageTypePageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: BeverageTypeListComponent },
      { path: 'form', component: BeverageTypeFormComponent },
      { path: 'form/:id', component: BeverageTypeFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeverageTypeRoutingModule { }
