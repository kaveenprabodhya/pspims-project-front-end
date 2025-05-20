import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopraSalePageComponent } from './pages/copra-sale-page/copra-sale-page.component';

const routes: Routes = [
  { path: '', component: CopraSalePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopraSaleRoutingModule { }
