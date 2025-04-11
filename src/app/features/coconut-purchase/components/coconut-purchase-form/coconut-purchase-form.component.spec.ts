import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoconutPurchaseFormComponent } from './coconut-purchase-form.component';

describe('CoconutPurchaseFormComponent', () => {
  let component: CoconutPurchaseFormComponent;
  let fixture: ComponentFixture<CoconutPurchaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoconutPurchaseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoconutPurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
