import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
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
  @Input() dataSource: MatTableDataSource<any>;
  @Input() displayedColumns: string[] = ['Image', 'Car name', 'Dni', 'Owner name', 'Profession'];
  @Input() dataColumns: string[] = ['car.giphyUrl', 'car.name', 'owner.dni', 'owner.name', 'owner.profession'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  viewTable = false;

  constructor(private carService: CarService, private ownerService: OwnerService, private giphyService: GiphyService) { }

  async ngOnInit() {
    await this.init();
    this.loadCarsWithOwners();
  }

  async init() {
    let carsAux: Array<any> = []
    let dnisAux: Array<any> = []
    let ownersAux: Array<any> = []
    await this.carService.getAllCarsP().then(
      (data) => {
        const response = data;
        const datos = response._embedded.cars;
        datos.forEach(car => {
          if (car.ownerDni) {
            car.href = car._links.self.href;
            car.id = car.href.slice(48);
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
            carsAux.push(car);
            if (!dnisAux.includes(car.ownerDni)) {
              dnisAux.push(car.ownerDni);
            }
          }
        });
        this.cars = carsAux
        this.ownersDnis = dnisAux
      }, (error) => {
        console.error(error);
    });
    await this.ownerService.getAllOwnersP().then(
      (data) => {
        const datos = data;
        const users = datos._embedded.owners;
        for (let owner of users) {
          if (this.ownersDnis) {
            if (this.ownersDnis.includes(owner.dni)) {
          console.log('aqui3')
              owner.id = owner._links.owner.href.slice(51);
              owner.href = owner._links.self.href;
              ownersAux.push(owner);
            }
          }
        }
        this.owners = ownersAux;
      }, (error) => {
        console.error(error);
    });
  }

  loadCarsWithOwners() {
    let aux: Array<CarsWithOwners> = [];
    const noDefinido = {
      id: 'NA',
      dni: 'NA',
      name: 'No Aplica',
      profession: 'No Aplica',
    }
    let proprietor: CarsWithOwners;
    if (this.cars && this.owners) {
      for (const car of this.cars) {
        const user = this.searchOwnerByDni(car.ownerDni);
        if (user){
          proprietor = {
            car: car,
            owner: user
          };
        } else {
          proprietor = {
            car: car,
            owner: noDefinido
          };
        }
        aux.push(proprietor);
      }
    }
    this.carsWithOwners = aux;
    this.fillTable()
    //this.orderByOwner();
  }

  searchOwnerByDni(dni: any): any {
    for (let user of this.owners) {
      if (user.dni === dni) {
        return user;
      }
    }
    return false;
  }

  fillTable() {
    this.viewTable = true;
    this.dataSource = new MatTableDataSource<any>(this.carsWithOwners);
    this.dataSource.paginator = this.paginator;

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
