import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";

@Component({
  selector: 'app-coconutwater-prod-order-list',
  imports: [TableComponent],
  templateUrl: './coconutwater-prod-order-list.component.html',
  styleUrl: './coconutwater-prod-order-list.component.css'
})
export class CoconutwaterProdOrderListComponent {

  coconutWaterProdOrders = [
    {
      prodOrderDetails: {
        orderCode: 'CWPO-001',
        quantity: 100,
        unit: 'LITER',
        startDate: '2025-05-01',
        endDate: '2025-05-03'
      }
    },
    {
      prodOrderDetails: {
        orderCode: 'CWPO-002',
        quantity: 150,
        unit: 'LITER',
        startDate: '2025-05-05',
        endDate: '2025-05-07'
      }
    }
  ];
  
  onEdit(ingredient: any) {
    // populate form or open modal
    console.log('Edit ingredient:', ingredient);
  }
  
  onDelete(index: number) {
    if (confirm('Are you sure you want to delete this ingredient?')) {
      this.coconutWaterProdOrders.splice(index, 1);
    }
  }
}
