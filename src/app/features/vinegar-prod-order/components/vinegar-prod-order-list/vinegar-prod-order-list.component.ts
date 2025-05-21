import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { ProdOrderDetails } from '../../../prod-order-details/models/prod-order-details.model';
import { FermentationTypeEnum } from '../../../../shared/enums/fermentation-type-enum';
import { VinegarProdOrder } from '../../models/vinegar-prod-order.model';
import { ProductionQuantityMeasureEnum } from '../../../../shared/enums/production-quantity-measure-enum';
import { ProdStatusEnum } from '../../../../shared/enums/prod-status-enum';

@Component({
  selector: 'app-vinegar-prod-order-list',
  imports: [TableComponent],
  templateUrl: './vinegar-prod-order-list.component.html',
  styleUrl: './vinegar-prod-order-list.component.css'
})
export class VinegarProdOrderListComponent {
  vinegarProdOrders: VinegarProdOrder[] = [];

  ngOnInit(): void {
    this.loadVinegarProdOrders();
  }

  loadVinegarProdOrders(): void {
    this.vinegarProdOrders = [
      {
        id: '1',
        prodOrderDetails: {
          prodDate: '2025-05-20',
          prodQuantity: 100,
          pricePerUnit: 10,
          totalAmount: 1000,
          productionQuantityMeasure: ProductionQuantityMeasureEnum.BOXES,
          prodStatus: ProdStatusEnum.CANCELED, 
          batchNumber: 'BATCH-001',
        } as ProdOrderDetails,
        fermentationType: FermentationTypeEnum.CLOSED_VAT, 
      },
    ];
  }

  onEdit(order: VinegarProdOrder): void {
    console.log('Edit:', order);
    // Add edit logic here
  }

  onDelete(order: VinegarProdOrder): void {
    console.log('Delete:', order);
    // Add delete logic here
  }
}
