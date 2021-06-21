import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
})
export class CarDetailComponent implements OnInit {

  title:string;
  status:string;
  car:Car;

  constructor(
    public _route: ActivatedRoute,
    public _router: Router,
    public _userService: UserService,
    public _carService: CarService,
    
  ) { 
    this.title = "Detalles";
    this.status = "";
    this.car = new Car(1, '', '', 1, '', null, null);
   }

  ngOnInit(): void {
    this.getCar();
  }

  getCar(){
    this._route.params.subscribe(
      params => {
        let id =+ params['id'];

        this._carService.getCar(id).subscribe(
          response => {
            console.log(response);
            if (response.status == 'success') {
              this.car = response.car;
              this.status = 'success';
            }else{
              this._router.navigate(['home']);
            }
          },
          error => {
            console.log(<any>error);
            this.status = 'error';
          }
        )
      });
  }

}
