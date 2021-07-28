import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authStyles.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hideConfirmPass = true;
  registerForm: FormGroup;

  disableButton = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private ngxSpinnerService: NgxSpinnerService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.configLoginForm();
  }


  async register() {
    this.disableButton = true;
    await this.ngxSpinnerService.show();
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(async (resp) => {
        this.disableButton = false;
        await this.ngxSpinnerService.hide();
      }, async (error) => {
        console.log(error.error.msg);
        this.matSnackBar.open(error.error.meg, '', { duration: 3000 });
        this.disableButton = false;
        await this.ngxSpinnerService.hide();
      })
    }
  }


  configLoginForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.checkPasswords('password','confirmPassword') })
  }

  // Validar Contraseña
  checkPasswords(password:string,confirmPassword:string) {
    return (formGroup:FormGroup)=>{
      const pass = formGroup.controls[password];
      const confirmPass = formGroup.controls[confirmPassword];
      if(pass.errors && !confirmPass.errors.notSame){
        return;
      }
      if(pass.value !== confirmPass.value){
        confirmPass.setErrors({notSame:true})
      }else{
        confirmPass.setErrors(null);
      }
    }
  }

  // Mensajes del formulario
  getErrorEmailMessage() {
    if (this.registerForm.get('email').hasError('required')) {
      return 'El E-mail es requerido';
    }

    return this.registerForm.get('email').hasError('email') ? 'E-mail inválido' : '';
  }

  getErrorPasswordMessage() {

    if (this.registerForm.get('password').hasError('required')) {
      return 'La contraseña es requerida.';
    }

    return this.registerForm.get('password').hasError('minlength') ? 'La contraseña es muy corta' : '';
  }

  getErrorConfirmPasswordMessage() {
    if (this.registerForm.get('confirmPassword').hasError('required')) {
      return 'Este campo es requerido.';
    }

    return this.registerForm.get('confirmPassword').hasError('notSame') ? 'Las contraseñas no coiciden' : '';
  }

  getErrorUserNameMessage() {
    if (this.registerForm.get('userName').hasError('required')) {
      return 'El nombre es requerido.';
    }

    return this.registerForm.get('userName').hasError('minlength') ? 'El nombre es muy corto' : '';
  }

}
