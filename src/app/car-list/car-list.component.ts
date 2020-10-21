import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;

  constructor(private carService: CarService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.carService.getCars().subscribe(data => {
      const datos = data;
      this.cars = datos._embedded.cars;
      for (const car of this.cars) {
        car.href = car._links.self.href;
        car.id = car.href.slice(48);
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });
  }
}
