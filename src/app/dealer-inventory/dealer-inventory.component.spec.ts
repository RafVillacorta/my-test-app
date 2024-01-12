import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DealerInventoryComponent } from './dealer-inventory.component';

import { HttpClientModule } from '@angular/common/http';
import { Vehicle } from '../vehicle';
import '@angular/common/locales/global/fr';
import { InventoryService } from '../inventory.service';
import { VehicleFormReactiveComponent } from '../vehicle-form-reactive/vehicle-form-reactive.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DealerInventoryComponent', () => {
  let component: DealerInventoryComponent;
  let fixture: ComponentFixture<DealerInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerInventoryComponent, VehicleFormReactiveComponent ],
      providers: [ InventoryService ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should add vehicle', waitForAsync(() => {
    let v = new Vehicle(
    "V3000", 2018, "BMW", "750i", 25000, 54000, false, [])
    //Wait for ngOnInit to complete
    fixture.whenStable().then(() => {
      component.addVehicle(v)
      //Wait for addVehicle to complete
      fixture.whenStable().then(() => {
        //Now do validation
        let car:Vehicle|undefined = component.inventory.find(item =>
        item.VIN === v.VIN);
        expect(car).toBeDefined();
        if(car != undefined){
          expect(car["make"]).toBe("BMW")
        }
      })
    })
  }))

});
