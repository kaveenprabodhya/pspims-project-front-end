import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeverageIngredientsPageComponent } from './pages/beverage-ingredients-page/beverage-ingredients-page.component';

const routes: Routes = [
  { path: '', component: BeverageIngredientsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeverageIngredientsRoutingModule { }
