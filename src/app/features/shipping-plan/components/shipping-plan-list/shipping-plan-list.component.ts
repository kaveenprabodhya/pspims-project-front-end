import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { ShippingPlan } from '../../models/shipping-plan.model';
import { ShippingTypeEnum } from '../../../../shared/enums/shipping-type-enum';
import { ShippingStatusEnum } from '../../../../shared/enums/shipping-status-enum';
import { DeliveryTypeEnum } from '../../../../shared/enums/delivery-type-enum';

@Component({
  selector: 'app-shipping-plan-list',
  imports: [TableComponent],
  templateUrl: './shipping-plan-list.component.html',
  styleUrl: './shipping-plan-list.component.css'
})
export class ShippingPlanListComponent {
  shippingPlans: ShippingPlan[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadShippingPlans();
  }

  loadShippingPlans(): void {
    // Mock data - replace with real API call later
    this.shippingPlans = [
      {
        id: '1',
        shippingAddress: '123 Main St',
        shippingDate: '2025-06-01',
        trackingNumber: 'TRACK123',
        shippingType: ShippingTypeEnum.EXPRESS,
        shippingStatus: ShippingStatusEnum.IN_TRANSIT,
        deliveryType: DeliveryTypeEnum.HOME_DELIVERY,
        deliveryVehicle: {
          id: 'v1',
          vehicleRegNo: 'XYZ-123',
          vehicleType: null as any,
          availabilityStatus: null as any
        }
      },
      {
        id: '2',
        shippingAddress: '456 Market St',
        shippingDate: '2025-06-03',
        trackingNumber: 'TRACK456',
        shippingType: ShippingTypeEnum.LAND,
        shippingStatus: ShippingStatusEnum.DELIVERED,
        deliveryType: DeliveryTypeEnum.PICKUP,
        deliveryVehicle: undefined
      }
    ];
  }

  onEdit(plan: ShippingPlan): void {
    console.log('Edit shipping plan', plan);
    // Navigate to edit page or open edit modal
  }

  onDelete(plan: ShippingPlan): void {
    console.log('Delete shipping plan', plan);
    // Confirm then delete logic here
  }
}
