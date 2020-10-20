import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from '../shared/owner/owner.service';

export class CarsWithOwners {
  car: any;
  owner: any;
}

@Component({
  selector: 'app-car-with-owner-list',
  templateUrl: './car-with-owner-list.component.html',
  styleUrls: ['./car-with-owner-list.component.css']
})
export class CarWithOwnerListComponent implements OnInit {
  cars: Array<any>;
  owners: Array<any>;
  ownersDnis: Array<any>;
  carsWithOwners: Array<CarsWithOwners>;

  constructor(private carService: CarService, private ownerService: OwnerService) { }

  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      const datos = data;
      for (const car of datos) {
        if (car.ownerDni) {
          this.cars.push(car);
          this.ownersDnis.push(car.ownerDni);
        }
      }
    });
    this.ownerService.getAll().subscribe(data => {
      const datos = data;
      const users = datos._embedded.owners;
      for (let owner of users) {
        if (this.ownersDnis) {
          if (this.ownersDnis.includes(owner.dni)) {
            owner.id = owner._links.owner.href.slice(51);
            owner.href = owner._links.self.href;
            this.owners.push(owner);
          }
        }
      }
    });
    this.loadCarsWithOwners();
  }

  loadCarsWithOwners() {
    if (this.cars) {
      for (const car of this.cars) {
        const user = this.searchOwnerByDni(car.ownerDni);
        const proprietor: CarsWithOwners = {
          car: car,
          owner: user
        };
        this.carsWithOwners.push(proprietor);
      }
      this.orderByOwner();
    }

  }

  searchOwnerByDni(dni: any): any {
    for (let user of this.owners) {
      if (user.dni === dni) {
        return user;
      }
    }
  }

  orderByOwner() {
    this.carsWithOwners.sort(
      function (a, b) {
        if (a.owner.dni > b.owner.dni) {
          return 1;
        }
        if (a.owner.dni < b.owner.dni) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    );
  }

}
