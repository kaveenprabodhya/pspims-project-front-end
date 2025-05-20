import { Component } from '@angular/core';
import { BeverageTypeListComponent } from "../../components/beverage-type-list/beverage-type-list.component";
import { BeverageTypeFormComponent } from "../../components/beverage-type-form/beverage-type-form.component";

@Component({
  selector: 'app-beverage-type-page',
  imports: [BeverageTypeListComponent, BeverageTypeFormComponent],
  templateUrl: './beverage-type-page.component.html',
  styleUrl: './beverage-type-page.component.css'
})
export class BeverageTypePageComponent {

}
