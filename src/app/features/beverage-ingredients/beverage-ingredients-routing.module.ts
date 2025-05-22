import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeverageIngredientsPageComponent } from './pages/beverage-ingredients-page/beverage-ingredients-page.component';
import { BeverageIngredientsListComponent } from './components/beverage-ingredients-list/beverage-ingredients-list.component';
import { BeverageIngredientsFormComponent } from './components/beverage-ingredients-form/beverage-ingredients-form.component';

const routes: Routes = [
  {
    path: '',
    component: BeverageIngredientsPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: BeverageIngredientsListComponent },
      { path: 'form', component: BeverageIngredientsFormComponent },
      { path: 'form/:id', component: BeverageIngredientsFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeverageIngredientsRoutingModule { }
