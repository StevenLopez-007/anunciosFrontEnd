import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginForm } from './interfaces/login.interface';

import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { RegisterForm } from './interfaces/register.interface';
import { NgxSpinnerService } from 'ngx-spinner';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,private router: Router,private ngxSpinnerService: NgxSpinnerService) { }

  login(loginData:LoginForm){
    return this.httpClient.post(`${base_url}/login`,{...loginData}).pipe(
      tap((token:any)=>{
        localStorage.setItem('a-token',token.token);
        this.router.navigateByUrl('/anuncios');
      })
    )
  }

  register(registerData:RegisterForm){
    return this.httpClient.post(`${base_url}/register`,{...registerData}).pipe(
      tap((token:any)=>{
        localStorage.setItem('a-token',token.token);
        this.router.navigateByUrl('/anuncios');
      })
    )
  }

  async logOut(){
    localStorage.removeItem('a-token');
    this.router.navigateByUrl('/login');
    await this.ngxSpinnerService.hide();
  }

  getToken(){
    return localStorage.getItem('a-token');
  }

  isLogged(){
    return !!this.getToken();
  }
}
