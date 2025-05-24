import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { ShippingPlan } from '../../models/shipping-plan.model';
import { ShippingTypeEnum } from '../../../../shared/enums/shipping-type-enum';
import { ShippingStatusEnum } from '../../../../shared/enums/shipping-status-enum';
import { DeliveryTypeEnum } from '../../../../shared/enums/delivery-type-enum';
import { ShippingPlanService } from '../../services/shipping-plan.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipping-plan-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './shipping-plan-list.component.html',
  styleUrl: './shipping-plan-list.component.css'
})
export class ShippingPlanListComponent {
  shippingPlans: ShippingPlan[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private shippingPlanService: ShippingPlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadShippingPlans(this.pageNumber);
    this.shippingPlanService.refreshShippingPlan$.subscribe(() => {
      this.loadShippingPlans(this.pageNumber);
    });
  }

  loadShippingPlans(page: number): void {
    this.shippingPlanService.getAll(page, this.pageSize).subscribe({
      next: (response) => {
        this.shippingPlans = response.content;
        this.pageNumber = response.page.number;
        this.pageSize = response.page.size;
        this.totalPages = response.page.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (err) => {
        console.error('Failed to load shipping plans', err);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadShippingPlans(page);
    }
  }

  onEdit(plan: ShippingPlan): void {
  }

  onDelete(plan: ShippingPlan): void {
  }
}
