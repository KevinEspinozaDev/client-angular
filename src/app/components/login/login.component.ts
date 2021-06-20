import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {

  title:string | undefined;
  user: User;
  token:any;
  identity:any;
  status:any;

  constructor(
    public _route: ActivatedRoute,
    public _router: Router,
    public _userService: UserService
  ) { 
    this.title = "Identifícate";
    this.user = new User(1, 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(){
    this.logout();
  }

  onSubmit(form:any){
    console.log(this.user);

    this._userService.signup(this.user, null).subscribe(
      response => {
        // Obtener Token
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
          // se guarda el token en el LocalStorage
          localStorage.setItem('token', this.token);

          // Obtener usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;

              // se guarda el usuario en el LocalStorage
            localStorage.setItem('identity', JSON.stringify(this.identity));
            
              // Redirección al home en caso exitoso
              this._router.navigate(['home']);
          },
            error => {
              console.log(<any>error);
            }
          );
        }else{
          this.status = 'error';
        }
        
        
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  logout(){
    this._route.params.subscribe(params => {
      let logout =+ params['sure'];
      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // redirección
        this._router.navigate(['login']);
      }
    });
  }

}