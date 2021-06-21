import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car-edit',
  templateUrl: '../car-new/car-new.component.html',
  providers : [UserService, CarService]
})
export class CarEditComponent implements OnInit {

  page_title:string;
  identity:any;
  token:any;
  car:Car;
  status_car:string;

  constructor(
    public _route: ActivatedRoute,
    public _router: Router,
    public _userService: UserService,
    public _carService: CarService,
  ) { 
    this.page_title = "Crear nuevo auto";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.car = new Car(1, '', '', 1, '', null, null);
    this.status_car = "";
  }

  ngOnInit(): void {
    if (this.identity == null) {
      this._router.navigate(['/login']);
    }else{
      // Obtener objeto car
      this.getCar();
    }
  }

  onSubmit(form:any){
    this._carService.create(this.token, this.car).subscribe(
      response => {
        
          this.car = response.car;
          console.log(response);
        if (response.status == 'success') {
          this.status_car = 'success';
          this._router.navigate(['/']);
        }else{
          this.status_car = 'error';
        }
        
      },
      error => {
        console.log(<any>error);
        this.status_car = 'error';
      } 
    );
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
            }else{
              this._router.navigate(['home']);
            }
          },
          error => {
            console.log(<any>error);
          }
        )
      });
  }

}
