import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { VehicleTypeEnum } from '../../../../shared/enums/vehicle-type-enum.enum';
import { VehicleAvailabilityStatusEnum } from '../../../../shared/enums/vehicle-availability-status-enum';
import { DeliveryVehicle } from '../../models/delivery-vehicle.model';
import { DeliveryVehicleService } from '../../services/delivery-vehicle.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-vehicle-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './delivery-vehicle-list.component.html',
  styleUrl: './delivery-vehicle-list.component.css',
})
export class DeliveryVehicleListComponent {
  deliveryVehicles: DeliveryVehicle[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private deliveryVehicleService: DeliveryVehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicles(this.pageNumber);
    this.deliveryVehicleService.refreshDeliveryVehicle$.subscribe(() => {
      this.loadVehicles(this.pageNumber);
    });
  }

  loadVehicles(page: number): void {
    this.deliveryVehicleService.getAll(page, this.pageSize).subscribe({
      next: (response) => {
        this.deliveryVehicles = response.content;
        this.pageNumber = response.page.number;
        this.pageSize = response.page.size;
        this.totalPages = response.page.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (error) => {
        console.error('Error loading vehicles:', error);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadVehicles(page);
    }
  }

  onEdit(vehicle: DeliveryVehicle): void {
    this.deliveryVehicleService.setSelectedVehicle(vehicle);
    this.router.navigate(['/admin/dashboard/delivery-vehicle/form', vehicle.id]);
  }

  onDelete(vehicle: DeliveryVehicle): void {
    if (confirm(`Are you sure you want to delete vehicle ${vehicle.vehicleRegNo}?`)) {
      this.deliveryVehicleService.delete(vehicle.id!).subscribe({
        next: () => {
          this.deliveryVehicles = this.deliveryVehicles.filter(v => v.id !== vehicle.id);
          this.deliveryVehicleService.triggerRefresh();
        },
        error: (err) => {
          if (err.status === 409) {
            alert('Cannot delete: This vehicle is assigned to one or more shipping plans.');
          } else {
            alert('An error occurred while deleting the vehicle.');
          }
        }
      });
    }
  }
  
}
