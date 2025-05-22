import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopraSalePageComponent } from './pages/copra-sale-page/copra-sale-page.component';
import { CopraSaleListComponent } from './components/copra-sale-list/copra-sale-list.component';
import { CopraSaleFormComponent } from './components/copra-sale-form/copra-sale-form.component';

const routes: Routes = [
  {
    path: '',
    component: CopraSalePageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CopraSaleListComponent },
      { path: 'form', component: CopraSaleFormComponent },
      { path: 'form/:id', component: CopraSaleFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopraSaleRoutingModule { }
