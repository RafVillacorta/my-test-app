import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { Vehicle } from '../vehicle';

function validate_VIN(control:AbstractControl) {
  const banned = ["I", "O", "Q"]

  if (banned.some(str => control.value.includes(str))) {
    return {
      error: "Must not contain I, O, or Q"
    }
  } else {
      return null //All good
  }
}

@Component({
  selector: 'app-vehicle-form-reactive',
  templateUrl: './vehicle-form-reactive.component.html',
  styleUrls: ['./vehicle-form-reactive.component.css']
})
export class VehicleFormReactiveComponent implements OnInit{
  
  vehicleForm !: FormGroup

  @Input()
  vehicle = new Vehicle("", 0, "", "", 0, 0, false, [])

  @Output("on-submit")
  emitter = new EventEmitter

  ngOnInit(): void {
    this.vehicleForm = new FormGroup({
      veh_vin: new FormControl(
        this.vehicle.VIN, [validate_VIN, Validators.minLength(3), Validators.required]),
      veh_year: new FormControl(
        this.vehicle.year, [Validators.required]),
      veh_make: new FormControl(
        this.vehicle.make, [Validators.required]),
      veh_model: new FormControl(
        this.vehicle.model, [Validators.required]),
      veh_mileage: new FormControl(
        this.vehicle.mileage, [Validators.required]),
      veh_price: new FormControl(
        this.vehicle.price, [Validators.required, Validators.min(100)]),
      veh_featured: new FormControl(
        this.vehicle.featured)
    })
  }

  handleSubmit() {
    const input = this.vehicleForm.value
    const v = new Vehicle(
      input.veh_vin,
      input.veh_year,
      input.veh_make,
      input.veh_model,
      input.veh_mileage,
      input.veh_price,
      input.veh_featured === "" ? false : input.veh_featured,
      [])
    this.emitter.emit(v)
  }

}
