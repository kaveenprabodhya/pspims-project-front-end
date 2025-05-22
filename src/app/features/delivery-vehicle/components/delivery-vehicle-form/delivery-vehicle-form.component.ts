import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleTypeEnum } from '../../../../shared/enums/vehicle-type-enum.enum';
import { VehicleAvailabilityStatusEnum } from '../../../../shared/enums/vehicle-availability-status-enum';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DeliveryVehicleService } from '../../services/delivery-vehicle.service';
import { filter } from 'rxjs';
import { DeliveryVehicle } from '../../models/delivery-vehicle.model';

@Component({
  selector: 'app-delivery-vehicle-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-vehicle-form.component.html',
  styleUrl: './delivery-vehicle-form.component.css'
})
export class DeliveryVehicleFormComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicleTypeOptions = Object.values(VehicleTypeEnum);
  availabilityStatusOptions = Object.values(VehicleAvailabilityStatusEnum);
  isEditMode = false;
  vehicle = this.initEmptyVehicle();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: DeliveryVehicleService
  ) {
    this.vehicleForm = this.fb.group({
      vehicleRegNo: ['', Validators.required],
      vehicleType: ['', Validators.required],
      availabilityStatus: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.vehicleService.selectedVehicle$.subscribe(data => {
          if (data && data.id === id) {
            this.vehicle = { ...data };
            this.vehicleForm.patchValue(this.vehicle);
          }
        });
      } else {
        this.isEditMode = false;
        this.vehicle = this.initEmptyVehicle();
        this.vehicleService.clearSelectedVehicle();
      }
    });

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.resetFormOnRoute();
    });

    this.resetFormOnRoute();
  }

  initEmptyVehicle(): DeliveryVehicle {
    return {
      vehicleRegNo: '',
      vehicleType: '' as VehicleTypeEnum,
      availabilityStatus: '' as VehicleAvailabilityStatusEnum
    };
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.vehicleService.selectedVehicle$.subscribe(data => {
        if (data) this.vehicle = { ...data };
      });
    } else {
      this.isEditMode = false;
      this.vehicle = this.initEmptyVehicle();
    }
  }
  
  onSubmit() {
    if (this.isEditMode) {
      console.log('Updating vehicle:', this.vehicle);
    } else {
      console.log('Adding vehicle:', this.vehicle);
    }
    this.resetForm();
  }

  resetForm() {
    this.vehicle = this.initEmptyVehicle();
    this.vehicleService.clearSelectedVehicle();
    this.router.navigate(['/admin/dashboard/delivery-vehicle/list']);
  }
}
