import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-dealer-inventory',
  templateUrl: './dealer-inventory.component.html',
  styleUrls: ['./dealer-inventory.component.css']
})

export class DealerInventoryComponent implements OnInit {
  inventory:Vehicle[] = []

  constructor(private inventorySvc:InventoryService) { }

  ngOnInit(): void {
    this.inventorySvc.getInventory().subscribe(list => this.inventory = list)
  }

  trackByVIN(index:number, car:Vehicle) : string {
    return car.VIN
  }

  deleteVehicle(car:Vehicle) {
    this.inventorySvc.deleteVehicle(car).subscribe(() => {
      //Update local copy of the list
      this.inventory = this.inventory.filter(v => v.VIN !== car.VIN)
    })
  }

  handlePhotoNavigation(photoIndex:number, car:Vehicle) {
    if (photoIndex == car.photos.length -1) {
      alert("Come visit us in our showroom!")
    }
  }

  addVehicle(v: Vehicle) {
    this.inventorySvc.addVehicle(v).subscribe(() => {
      this.inventory.push(v)
    })
  }

  vehicleToEdit?:Vehicle

  beginEditing(v:Vehicle) {
    this.vehicleToEdit = v
  }

  commitEdit(v:Vehicle) {
    this.inventorySvc.updateVehicle(this.vehicleToEdit!.VIN, v).subscribe(() => {
    Object.assign(this.vehicleToEdit!, v)
    this.vehicleToEdit = undefined
})
  }



}
