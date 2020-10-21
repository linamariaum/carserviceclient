import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogLink } from '../dialog-link/dialog-link';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private giphyService: GiphyService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          } else {
            Swal.fire({
              icon: 'info',
              title: `Car not found`,
              text: `Car with id '${id}' not found, returning to list`,
              showConfirmButton: false,
              timer: 1800
            });
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        }, error => {
          Swal.fire({
            icon: 'info',
            title: `Car not found`,
            text: `Car with id '${id}' not found, returning to list`,
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
    this.router.navigate(['/car-list']);
  }

  save(form: NgForm) {
    this.carService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    Swal.fire({
      title: 'Are you sure you want to delete this car?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#949B9C',
      confirmButtonText: 'Yes, remove!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.value) {
        this.carService.remove(href).subscribe(result => {
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

  linkOwner(car: any) {
    //Link to a OWNER
    const dialogRef = this.dialog.open(DialogLink, {
      height: '90%',
      width: '60%',
      data: { content: car, type: 'car', response: null}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Eligio persona
        Swal.fire({
          icon: 'success',
          title: `${result.response.name} owns the ${car.name}`,
          showConfirmButton: true
        });
      }
    });
  }

}

