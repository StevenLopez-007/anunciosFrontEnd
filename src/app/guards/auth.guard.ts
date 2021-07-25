import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router){}
    async canActivate(){

      if(await this.authService.isLogged()){
         return true;
      }
      else
     {
         this.router.navigate(['/login'])
         return false;
     }
  }



}
