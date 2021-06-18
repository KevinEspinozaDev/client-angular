import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User;
  title:string;
  status:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    public _UserService:UserService,
    
  ) { 
    this.title = "Regístrate";
    this.user = new User(1, 'ROLE_USER', '', '', '', '');
    this.status = "";
  }

  ngOnInit(){
    console.log(this._UserService);
  }

  onSubmit(form:any){
    this._UserService.register(this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;

          // Vaciar formulario
          this.user = new User(1, 'ROLE_USER', '', '', '', '');
          form.reset();
        }else if(response.status == 'exist'){
          this.status = response.status;
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error)
      }
    );
  }

}
