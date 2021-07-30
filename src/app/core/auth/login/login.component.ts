import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authStyles.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  disableButton = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.configLoginForm();
  }

  getErrorPasswordMessage() {
    if (this.loginForm.get('password').hasError('required')) {
      return 'La contraseña es requerida.';
    }

    return this.loginForm.get('password').hasError('minlength') ? 'La contraseña es muy corta' : '';
  }


  getErrorEmailMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'El E-mail es requerido';
    }

    return this.loginForm.get('email').hasError('email') ? 'E-mail inválido' : '';
  }


  configLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async login() {
    this.disableButton = true;
    if (this.loginForm.valid) {
      await this.ngxSpinnerService.show();
      this.authService.login(this.loginForm.value).subscribe(async (resp) => {
        this.disableButton = false;
        await this.ngxSpinnerService.hide();
      }, async (error) => {
        this.matSnackBar.open(error.error.msg, '', { duration: 3000 });
        this.disableButton = false;
        await this.ngxSpinnerService.hide();
      })
    }
  }
}
