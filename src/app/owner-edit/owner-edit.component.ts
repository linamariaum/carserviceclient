import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OwnerService } from '../shared/owner/owner.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';
import { DialogLink } from '../dialog-link/dialog-link';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {
  owner: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
              public dialog: MatDialog,
              private carService: CarService) {
  }

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.ownerService.get(id).subscribe((user: any) => {
          if (user) {
            this.owner = user;
            this.owner.href = user._links.self.href;
          } else {
            Swal.fire({
              icon: 'info',
              title: `Owner not found`,
              text: `Owner with id '${id}' not found, returning to list`,
              showConfirmButton: false,
              timer: 1800
            });
            console.log(`Owner with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        }, error => {
          Swal.fire({
            icon: 'info',
            title: `Owner not found`,
            text: `Owner with id '${id}' not found, returning to list`,
            showConfirmButton: false,
            timer: 1800
          });
          this.gotoList();
          console.error(error)});
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(owner) {
    Swal.fire({
      title: 'Are you sure you want to delete this owner?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#949B9C',
      confirmButtonText: 'Yes, remove!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.value) {
        // Desvincular autos si tiene
        this.carService.getCars().subscribe(data => {
          const response = data;
          const datos = response._embedded.cars;
          for (const car of datos) {
            if (car.ownerDni === owner.dni) {
              car.href = car._links.self.href;
              car.id = car.href.slice(48);
              car.ownerDni = null;
              this.carService.save(car).subscribe(result => {
                // Actualiza al carro
              }, error => console.error(error));
            }
          }
        });
        // Eliminar
        this.ownerService.remove(owner.href).subscribe(result => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            showConfirmButton: false,
            timer: 1500
          });
          this.gotoList();
        }, error => console.error(error));
      }
    });
  }

  linkOwner(owner: any){
    //Link to a CAR
    const dialogRef = this.dialog.open(DialogLink, {
      height: '90%',
      width: '60%',
      data: { content: owner, type: 'owner', response: null}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Eligio carrito
        Swal.fire({
          icon: 'success',
          title: `${owner.name} owns the ${result.response.name}`,
          showConfirmButton: true
        });
      }
    });
  }

}
