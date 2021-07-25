import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
    async canActivate(){
        if(await this.authService.isLogged()){
            this.router.navigate(['/anuncios'])
            return false
        }
        else{
            return true
        }
    }


}
