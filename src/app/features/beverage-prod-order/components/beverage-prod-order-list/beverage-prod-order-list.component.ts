import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";

@Component({
  selector: 'app-beverage-prod-order-list',
  imports: [TableComponent],
  templateUrl: './beverage-prod-order-list.component.html',
  styleUrl: './beverage-prod-order-list.component.css'
})
export class BeverageProdOrderListComponent {
  
  beverageProdOrders = [
    {
      id: '1a2b3c',
      prodOrderDetails: {
        id: 'pod-001'
        // Add more fields if needed
      },
      beverageType: {
        name: 'Lemon Juice'
      }
    },
    {
      id: '4d5e6f',
      prodOrderDetails: {
        id: 'pod-002'
      },
      beverageType: {
        name: 'Coconut Water'
      }
    },
    {
      id: '7g8h9i',
      prodOrderDetails: {
        id: 'pod-003'
      },
      beverageType: {
        name: 'Ginger Ale'
      }
    }
  ];

  onEdit(order: any) {
    console.log('Edit', order);
  }

  onDelete(index: number) {
    this.beverageProdOrders.splice(index, 1);
  }

}
