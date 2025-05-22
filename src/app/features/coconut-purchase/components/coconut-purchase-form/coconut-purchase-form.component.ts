import { Component } from '@angular/core';
import { CoconutQualityGrade } from '../../../../shared/enums/coconut-quality-grade.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoconutPurchase } from '../../models/coconut-purchase.model';
import { Supplier } from '../../../supplier/models/supplier.model';
import { Inventory } from '../../../inventory/models/inventory.model';
import { CoconutPurchaseService } from '../../services/coconut-purchase.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-coconut-purchase-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './coconut-purchase-form.component.html',
  styleUrl: './coconut-purchase-form.component.css',
})
export class CoconutPurchaseFormComponent {
  isEditMode = false;

  purchase = this.initEmptyPurchase();

  coconutQualityGrades = Object.values(CoconutQualityGrade);

  suppliers = [
    { id: 'sup-1', name: 'Supplier A' },
    { id: 'sup-2', name: 'Supplier B' },
  ];

  inventories = [
    { id: 'inv-1', name: 'Main Inventory' },
    { id: 'inv-2', name: 'Backup Inventory' },
  ];

  constructor(
    private purchaseService: CoconutPurchaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.purchaseService.selectedPurchase$.subscribe((data) => {
          if (data && data.id === id) {
            this.purchase = { ...data };
          } else {
            // Optionally: fetch by id from backend
            // this.purchaseService.getById(id).subscribe(p => this.purchase = p);
          }
        });
      } else {
        this.isEditMode = false;
        this.purchase = this.initEmptyPurchase();
        this.purchaseService.clearSelectedPurchase();
      }
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });
      this.resetFormOnRoute();
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.purchaseService.selectedPurchase$.subscribe(data => {
        if (data) {
          this.purchase = { ...data };
        } else {
          // Optionally fetch by ID if someone typed the URL directly
        }
      });
    } else {
      this.isEditMode = false;
      this.purchase = this.initEmptyPurchase();
    }
  }

  loadCocoPurchase(){}

  initEmptyPurchase(): CoconutPurchase {
    return {
      purchaseQuantity: 0,
      pricePerUnit: 0,
      purchaseDate: '',
      coconutQualityGrade: '' as CoconutQualityGrade,
      supplier: {} as Supplier,
      inventory: {} as Inventory,
    };
  }

  calculateTotalCost(): number {
    return this.purchase.purchaseQuantity * this.purchase.pricePerUnit;
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updatePurchase();
    } else {
      this.addPurchase();
    }
  }

  addPurchase() {
    console.log('Adding purchase:', this.purchase);
    // Call service API add here
    // this.purchaseService.addPurchase(this.purchase).subscribe(() => { ... });
    this.resetForm();
  }

  updatePurchase() {
    console.log('Updating purchase:', this.purchase);
    // Call service API update here
    // this.purchaseService.updatePurchase(this.purchase.id, this.purchase).subscribe(() => { ... });
    this.resetForm();
  }

  resetForm() {
    this.purchase = this.initEmptyPurchase();
    this.purchaseService.clearSelectedPurchase();
    this.router.navigate(['admin/dashboard/coconut-purchase/list'],);
  }
}
