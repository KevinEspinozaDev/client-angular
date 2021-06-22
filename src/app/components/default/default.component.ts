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
  token:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    public _userService:UserService,
    public _carService:CarService
    
  ) { 
    this.title = "Inicio";
    this.cars = [];
    this.token = _userService.getToken();
  }

  getCars(){
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

  deleteCar(id:any){
    this._carService.delete(this.token, id).subscribe(
      response => {
        //this._router.navigate(['/']);
        this.getCars();
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  ngOnInit(){
    this.getCars();
  }

}


