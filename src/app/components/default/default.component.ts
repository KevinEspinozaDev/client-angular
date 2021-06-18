import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'default',
  templateUrl: './default.component.html'
})
export class DefaultComponent implements OnInit {

  title:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    public _UserService:UserService,
    
  ) { 
    this.title = "Inicio";
  }

  ngOnInit(){
    console.log(this._UserService);
  }

}


