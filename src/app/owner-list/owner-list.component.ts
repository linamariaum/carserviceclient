import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OwnerService } from '../shared/owner/owner.service';
import Swal from 'sweetalert2';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  dataColumns: string[] = ['select', 'dni', 'name', 'profession', 'edit'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  selection = new SelectionModel<any>(true, []);

  constructor(private ownerService: OwnerService, private carService: CarService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      const users = data;
      this.owners = users._embedded.owners;
      for (let owner of this.owners) {
        owner.id = owner._links.owner.href.slice(51);
        owner.href = owner._links.self.href;
      }
      this.init();
    });
  }

  getSelectedOwners(): any[] {
    return [...this.selection.selected];
  }

  deleteSelectedOwners() {
    // Owners Selected
    const ownersToDelete = this.getSelectedOwners();
    console.log("se seleccionó a:")
    console.log(ownersToDelete)

    Swal.fire({
      title: 'Are you sure you want to remove these owners?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#949B9C',
      confirmButtonText: 'Yes, remove!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.value) {
        // Desvincular los autos de estos propietarios
        this.carService.getAll().subscribe(data => {
          const datos = data;
          for (const car of datos) {
            for (const ownerDelete of ownersToDelete) {
              if (car.ownerDni === ownerDelete.dni) {
                car.ownerDni = null;
                this.carService.save(car).subscribe(result => {
                  // Actualiza al carro
                }, error => console.error(error));
              }
            }
          }
        });
        // Eliminar
        console.log(ownersToDelete)
        for (const ownerDelete of ownersToDelete) {
          const index: number = this.owners.indexOf(this.searchOwnerById(ownerDelete.id));
          if (index !== -1) {
              this.owners.splice(index, 1);
          }
          console.log(ownerDelete)
          this.ownerService.remove(ownerDelete.href).subscribe(result => {
            this.init();
          }, error => console.error(error));
        }
        this.selection.selected.length = 0;
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  searchOwnerById(id: number): any {
    for (let user of this.owners) {
      if (user.id === id) {
        return user;
      }
    }
  }

  init() {
    this.dataSource = new MatTableDataSource<any>(this.owners);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Items for page';
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
