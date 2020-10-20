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
      console.log('personita')
      this.identificador = 'ID';
      // Listar carros
      this.carService.getAll().subscribe(data => {
        const cars = data;
        for (const car of cars) {
          if (car.ownerDni) {
            this.datos.push(car);
          }
        }
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel = 'Items for page';
      });

    } else if (this.data.type === 'car') {
      console.log('carrito')
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
        this.dataSource.paginator._intl.itemsPerPageLabel = 'Items for page';
      });
    }

  }

  link() {
    if (this.data.response) {
      if (this.data.type === 'owner') {
        this.data.response.ownerDni = this.data.content.dni;
        this.ownerService.save(this.data.response).subscribe(result => {
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
