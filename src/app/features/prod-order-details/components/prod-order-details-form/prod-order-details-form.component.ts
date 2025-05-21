import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-prod-order-details-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prod-order-details-form.component.html',
  styleUrl: './prod-order-details-form.component.css'
})
export class ProdOrderDetailsFormComponent {
  @Input() group!: FormGroup;
}
