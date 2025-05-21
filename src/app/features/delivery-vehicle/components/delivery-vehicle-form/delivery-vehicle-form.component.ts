import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleTypeEnum } from '../../../../shared/enums/vehicle-type-enum.enum';
import { VehicleAvailabilityStatusEnum } from '../../../../shared/enums/vehicle-availability-status-enum';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      vehicleRegNo: ['', Validators.required],
      vehicleType: ['', Validators.required],
      availabilityStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.vehicleForm.valid) {
      const newVehicle = this.vehicleForm.value;
      console.log('Saving vehicle:', newVehicle);
    }
  }
}
