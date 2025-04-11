import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoconutPurchasePageComponent } from './coconut-purchase-page.component';

describe('CoconutPurchasePageComponent', () => {
  let component: CoconutPurchasePageComponent;
  let fixture: ComponentFixture<CoconutPurchasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoconutPurchasePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoconutPurchasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
