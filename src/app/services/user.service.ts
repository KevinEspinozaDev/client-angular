import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  public indentity:any;
  public token:any;

  constructor(
    public __http: HttpClient
  ) { 
    this.url = GLOBAL.url;
   }

  pruebas(){
    console.log('user.service.ts Funcionando.');
  }

  register(user:any): Observable<any>{
    let json = JSON.stringify(user);
    let params = "json="+json;
  
    let headers: Object = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      responseType: 'json',
    }

    //let header = new HttpHeaders().append('Content Type', 'application/x-www-form-urlencoded');
  
    return this.__http.post(this.url+'register', params, headers);
  }

  signup(user:any, getToken:any) : Observable<any>{
    
    if (getToken != null) {
      user.getToken = "true";
    }else{
      user.getToken = "false";
    }

    let json = JSON.stringify(user);
    let params = "json="+json;
  
    let headers: Object = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      responseType: "json",
    }

    //let header = new HttpHeaders().append('Content Type', 'application/x-www-form-urlencoded');
  
    return this.__http.post(this.url+'login', params, headers);
  }

  getIdentity(){
    let identity:any = JSON.parse(localStorage.getItem('identity')!);

    if (identity != 'undefined') {
      this.indentity = identity;
    }else{
      this.indentity = 'null';
    }

    return this.indentity;
  }

  getToken(){
     let token:any = localStorage.getItem('token');

    if (token != 'undefined') {
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

}
