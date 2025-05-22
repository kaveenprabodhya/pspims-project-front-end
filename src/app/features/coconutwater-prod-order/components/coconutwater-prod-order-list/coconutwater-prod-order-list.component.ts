import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ProductionQuantityMeasureEnum } from '../../../../shared/enums/production-quantity-measure-enum';
import { ProdStatusEnum } from '../../../../shared/enums/prod-status-enum';
import { CoconutWaterProdOrder } from '../../models/coconutwater-prod-order.model';

@Component({
  selector: 'app-coconutwater-prod-order-list',
  imports: [TableComponent],
  templateUrl: './coconutwater-prod-order-list.component.html',
  styleUrl: './coconutwater-prod-order-list.component.css',
})
export class CoconutwaterProdOrderListComponent {
  coconutWaterProdOrders: CoconutWaterProdOrder[] = [
    {
      id: 'asdddfgfggh',
      prodOrderDetails: {
        id: '1a2b3c',
        version: 1,
        createdDate: '2025-05-01T10:00:00Z',
        lastModifiedDate: '2025-05-02T12:30:00Z',
        prodDate: '2025-05-10',
        prodQuantity: 100,
        pricePerUnit: 2.5,
        totalAmount: 250,
        productionQuantityMeasure: ProductionQuantityMeasureEnum.LITERS,
        prodStatus: ProdStatusEnum.COMPLETED,
        batchNumber: 'BATCH-001',
      },
    },
  ];

  onEdit(ingredient: any) {
    // populate form or open modal
    console.log('Edit ingredient:', ingredient);
  }

  onDelete(ingredient: any) {}
}
