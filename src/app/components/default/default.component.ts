import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  providers: [UserService, CarService]
})
export class DefaultComponent implements OnInit {

  title:string;
  cars: Array<Car>

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    public _userService:UserService,
    public _carService:CarService
    
  ) { 
    this.title = "Inicio";
    this.cars = [];
  }

  ngOnInit(){
    this._carService.getCars().subscribe(
      response => {
        if (response.status == 'success') {
          this.cars = response.cars;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}


