import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'dialog-link',
  templateUrl: 'dialog-link.html',
})
export class DialogLink implements OnInit {
  datos: any;
  dataSource: MatTableDataSource<any>;
  // Name columns to displayed
  dataColumns = ['select', 'id', 'name'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selected: any;
  identificador: string;

  constructor(
    public dialogRef: MatDialogRef<DialogLink>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ownerService: OwnerService,
    private carService: CarService) {}

  ngOnInit() {
    if (this.data.type === 'owner') {
      this.identificador = 'ID';
      let carsAux: Array<any> = []
      // Listar carros
      this.carService.getCars().subscribe(data => {
        const response = data;
        const cars = response._embedded.cars;
        for (const car of cars) {
          if (!car.ownerDni) {
            car.href = car._links.self.href;
            car.id = car.href.slice(48);
            carsAux.push(car);
          }
        }
        this.datos = carsAux
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;
      });

    } else if (this.data.type === 'car') {
      this.identificador = 'DNI';
      // Listar owners
      this.ownerService.getAll().subscribe(data => {
        const users = data;
        this.datos = users._embedded.owners;
        for (let owner of this.datos) {
          owner.id = owner._links.owner.href.slice(51);
        }
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;
      });
    }

  }

  link() {
    if (this.data.response) {
      if (this.data.type === 'owner') {
        this.data.response.ownerDni = this.data.content.dni;
        this.carService.save(this.data.response).subscribe(result => {
          //Actualizado exitosamente
        }, error => console.error(error));
      }
      else {
        this.data.content.ownerDni = this.data.response.dni;
        this.ownerService.save(this.data.content).subscribe(result => {
          //Actualizado exitosamente
        }, error => console.error(error));
      }
    }
  }

  selectedToLink() {
    this.data.response = this.searchDataById(this.selected);
  }

  searchDataById(id: number): any {
    for (let dato of this.datos) {
      if (dato.id === id) {
        return dato;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
