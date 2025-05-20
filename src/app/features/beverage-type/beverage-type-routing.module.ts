import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeverageTypePageComponent } from './pages/beverage-type-page/beverage-type-page.component';

const routes: Routes = [
  { path: '', component: BeverageTypePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeverageTypeRoutingModule { }
