import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormReactiveComponent } from './vehicle-form-reactive.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('VehicleFormReactiveComponent', () => {
  let component: VehicleFormReactiveComponent;
  let fixture: ComponentFixture<VehicleFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleFormReactiveComponent ],
      imports:[ FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should validate input", () => {
    let input = {
    veh_vin: "V1000",
    veh_year: 2019,
    veh_make: "BMW",
    veh_model: "330i",
    veh_mileage: 25000,
    veh_price: 22000,
    veh_featured: true
    }
    //Simulate user input
    component.vehicleForm.setValue(input)
    expect(component.vehicleForm.valid).toBeTrue()
    input.veh_vin = "V1QQQQ" //Invalid
    component.vehicleForm.setValue(input)
    expect(component.vehicleForm.valid).toBeFalse()
    })
});
