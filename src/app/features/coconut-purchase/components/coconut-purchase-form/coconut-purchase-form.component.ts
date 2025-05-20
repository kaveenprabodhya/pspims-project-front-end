import { Component } from '@angular/core';
import { CoconutQualityGrade } from '../../../../shared/enums/coconut-quality-grade.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coconut-purchase-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './coconut-purchase-form.component.html',
  styleUrl: './coconut-purchase-form.component.css'
})
export class CoconutPurchaseFormComponent {

  purchase = {
    purchaseQuantity: 0,
    pricePerUnit: 0,
    purchaseDate: '',
    coconutQualityGrade: '' as CoconutQualityGrade,
    supplier: '',
    inventory: ''
  };

  coconutQualityGrades = Object.values(CoconutQualityGrade);

  suppliers = [
    { id: 'sup-1', name: 'Supplier A' },
    { id: 'sup-2', name: 'Supplier B' }
  ];
  
  inventories = [
    { id: 'inv-1', name: 'Main Inventory' },
    { id: 'inv-2', name: 'Backup Inventory' }
  ];

  calculateTotalCost(): number {
    return this.purchase.purchaseQuantity * this.purchase.pricePerUnit;
  }
  
  onSubmit() {
    console.log('Submitting:', this.purchase);
  }
}
