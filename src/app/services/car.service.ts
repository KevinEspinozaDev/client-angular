import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Car } from '../models/car';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  public url:string;

  constructor(
    public __http: HttpClient
  ) { 
    this.url = GLOBAL.url;
   }

  pruebas(){
    
  }

  create(token:string, car:Car) : Observable<any>{
    
    let json = JSON.stringify(car);
    let params = "json="+json;

    let headers: Object = {
        headers: new HttpHeaders().
        set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token),
        responseType: "json"
        
    };
    console.log(params);
    return this.__http.post(this.url+'cars', params, headers);
    
  }

  getCars(): Observable<any>{
    let headers: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.__http.get(this.url+'cars', headers);
  }

}