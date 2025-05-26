import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  styleUrl: './delivery-vehicle-form.component.css',
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
      availabilityStatus: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.vehicleService.selectedVehicle$.subscribe((data) => {
          if (data && data.id === id) {
            this.vehicle = { ...data };
            this.vehicleForm.patchValue(this.vehicle);
          } else {
            this.vehicleService.getById(id).subscribe(data => {
              this.vehicle = data;
              this.vehicleForm.patchValue(data);
            });
          }
        });
      } else {
        this.isEditMode = false;
        this.vehicle = this.initEmptyVehicle();
        this.vehicleService.clearSelectedVehicle();
      }
    });

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });

    this.resetFormOnRoute();
  }

  initEmptyVehicle(): DeliveryVehicle {
    return {
      vehicleRegNo: '',
      vehicleType: '' as VehicleTypeEnum,
      availabilityStatus: '' as VehicleAvailabilityStatusEnum,
    };
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.vehicleService.selectedVehicle$.subscribe((data) => {
        if (data) {
          this.vehicle = { ...data };
        } else {
          this.vehicleService.getById(id).subscribe(data => {
            this.vehicle = data;
            this.vehicleForm.patchValue(data);
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.vehicle = this.initEmptyVehicle();
    }
  }

  onSubmit() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    const formValue = this.vehicleForm.value;

    if (this.isEditMode && this.vehicle.id) {
      this.vehicleService.update(this.vehicle.id, formValue).subscribe(() => {
        this.resetForm();
      });
    } else {
      this.vehicleService.create(formValue).subscribe(() => {
        this.resetForm();
      });
    }
    this.resetForm();
  }

  resetForm() {
    this.vehicle = this.initEmptyVehicle();
    this.vehicleService.clearSelectedVehicle();
    this.vehicleService.triggerRefresh();
    this.router.navigate(['/admin/dashboard/delivery-vehicle/list']);
  }

  getFormErrors(form: FormGroup = this.vehicleForm, parentKey: string = ''): string[] {
    const errors: string[] = [];
  
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      const controlPath = parentKey ? `${parentKey}.${key}` : key;
  
      if (control instanceof FormGroup) {
        errors.push(...this.getFormErrors(control, controlPath));
      } else if (control && control.invalid && (control.dirty || control.touched)) {
        const controlErrors = control.errors;
        if (controlErrors) {
          Object.keys(controlErrors).forEach((errorKey) => {
            const fieldName = this.formatFieldName(controlPath);
            let message = `${fieldName}: ${errorKey}`;
  
            // Custom error messages
            if (errorKey === 'required') {
              message = `${fieldName} is required.`;
            } else if (errorKey === 'email') {
              message = `${fieldName} must be a valid email address.`;
            } else if (errorKey === 'minlength') {
              message = `${fieldName} is too short.`;
            } else if (errorKey === 'maxlength') {
              message = `${fieldName} is too long.`;
            } else if (errorKey === 'pattern') {
              message = `${fieldName} format is invalid.`;
            }
  
            errors.push(message);
          });
        }
      }
    });
  
    return errors;
  }

  private formatFieldName(fieldPath: string): string {
    return fieldPath
      .split('.')
      .map(part =>
        part
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim()
      )
      .join(' > ');
  }
  
}
