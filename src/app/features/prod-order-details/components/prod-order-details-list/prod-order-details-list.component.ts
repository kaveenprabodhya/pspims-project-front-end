import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ProdOrderDetails } from '../../models/prod-order-details.model';
import { ProductionQuantityMeasureEnum } from '../../../../shared/enums/production-quantity-measure-enum';
import { ProdStatusEnum } from '../../../../shared/enums/prod-status-enum';

@Component({
  selector: 'app-prod-order-details-list',
  imports: [TableComponent],
  templateUrl: './prod-order-details-list.component.html',
  styleUrl: './prod-order-details-list.component.css',
})
export class ProdOrderDetailsListComponent {
  prodOrderDetailsList: ProdOrderDetails[] = [];

  onEdit(prodOrderDetails: ProdOrderDetails): void {
    console.log('Edit Payment:', prodOrderDetails);
    // TODO: Open edit form/modal
  }

  onDelete(prodOrderDetails: ProdOrderDetails): void {
    console.log('Delete Payment:', prodOrderDetails);
    // TODO: Confirm and delete
  }
}
