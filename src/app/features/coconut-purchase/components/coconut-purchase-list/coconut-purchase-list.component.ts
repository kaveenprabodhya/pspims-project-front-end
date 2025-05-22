import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { CoconutPurchase } from '../../models/coconut-purchase.model';
import { CoconutQualityGrade } from '../../../../shared/enums/coconut-quality-grade.enum';
import { CoconutPurchaseService } from '../../services/coconut-purchase.service';
import { Router } from '@angular/router';

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
      coconutQualityGrade: CoconutQualityGrade.HIGH,
      inventory: {
        id: 'qwerty'
      } as any,
      supplier: {
        id: 'asdfgh'
      } as any,
    }
  ];

  constructor(
    private purchaseService: CoconutPurchaseService,
    private router: Router
  ) {}

  onEdit(item: CoconutPurchase) {
    this.purchaseService.setSelectedPurchase(item);
    this.router.navigate(['/admin/dashboard/coconut-purchase/form', item.id]);
  }

  onDelete(item: CoconutPurchase) {
  }
}
