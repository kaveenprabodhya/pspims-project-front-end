import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopraSalePageComponent } from './copra-sale-page.component';

describe('CopraSalePageComponent', () => {
  let component: CopraSalePageComponent;
  let fixture: ComponentFixture<CopraSalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopraSalePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopraSalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
