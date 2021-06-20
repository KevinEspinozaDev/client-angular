import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers : [UserService, CarService]
})
export class CarNewComponent implements OnInit {

  page_title:string;
  identity:any;
  token:any;
  car:Car;
  status_car:string;

  constructor(
    public _route:ActivatedRoute,
    public _router:Router,
    public _userService:UserService,
    public _carService:CarService
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
      // Crear objeto car
      this.car = new Car(1, '', '', 1, '', null, null);
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

}
