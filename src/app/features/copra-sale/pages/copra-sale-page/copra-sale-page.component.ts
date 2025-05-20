import { Component } from '@angular/core';
import { CopraSaleListComponent } from "../../components/copra-sale-list/copra-sale-list.component";
import { CopraSaleFormComponent } from "../../components/copra-sale-form/copra-sale-form.component";

@Component({
  selector: 'app-copra-sale-page',
  imports: [CopraSaleListComponent, CopraSaleFormComponent],
  templateUrl: './copra-sale-page.component.html',
  styleUrl: './copra-sale-page.component.css'
})
export class CopraSalePageComponent {

}
