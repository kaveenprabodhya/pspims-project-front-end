import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableComponent } from './components/table/table.component';
import { ToastComponent } from './components/toast/toast.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalComponent,
    NavbarComponent,
    SpinnerComponent,
    TableComponent,
    ToastComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
