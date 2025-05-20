import { Component } from '@angular/core';
import { CoconutPurchaseListComponent } from "../../components/coconut-purchase-list/coconut-purchase-list.component";
import { CoconutPurchaseFormComponent } from "../../components/coconut-purchase-form/coconut-purchase-form.component";

@Component({
  selector: 'app-coconut-purchase-page',
  imports: [CoconutPurchaseListComponent, CoconutPurchaseFormComponent],
  templateUrl: './coconut-purchase-page.component.html',
  styleUrl: './coconut-purchase-page.component.css'
})
export class CoconutPurchasePageComponent {

}
