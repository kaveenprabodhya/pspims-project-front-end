import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { CoconutPurchase } from '../../models/coconut-purchase.model';
import { CoconutQualityGrade } from '../../../../shared/enums/coconut-quality-grade.enum';

@Component({
  selector: 'app-coconut-purchase-list',
  imports: [TableComponent],
  templateUrl: './coconut-purchase-list.component.html',
  styleUrl: './coconut-purchase-list.component.css'
})
export class CoconutPurchaseListComponent {
  coconutPurchases: CoconutPurchase[] = [
    {
      id: '1',
      purchaseQuantity: 100,
      pricePerUnit: 2.5,
      totalPurchaseCost: 250,
      purchaseDate: '2024-06-01',
      coconutQualityGrade: '' as CoconutQualityGrade,
      inventory: null as any,
      supplier: null as any,
    },
    {
      id: '2',
      purchaseQuantity: 80,
      pricePerUnit: 2.0,
      totalPurchaseCost: 160,
      purchaseDate: '2024-06-10',
      coconutQualityGrade: '' as CoconutQualityGrade,
      inventory: null as any,
      supplier: null as any,
    },
  ];

  onEdit(item: CoconutPurchase) {
    console.log('Edit item:', item);
    // Add your edit logic
  }

  onDelete(item: CoconutPurchase) {
  }
}
