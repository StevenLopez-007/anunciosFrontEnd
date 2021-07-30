import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnuncioService } from '../../../services/anuncio.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registrar-anuncio',
  templateUrl: './registrar-anuncio.component.html',
  styleUrls: ['./registrar-anuncio.component.scss']
})
export class RegistrarAnuncioComponent implements OnInit {

  registerAnuncioForm: FormGroup;

  monedas = ['USD', 'SVC'];

  amenidadesCheck = [
    {
      name: 'Piscina',
      value: 'pisinca'
    }, {
      name: 'Aire acondicionado',
      value: 'ac'
    }, {
      name: 'Seguridad Privada',
      value: 'sp'
    }, {
      name: 'Jardín',
      value: 'jardin'
    }
  ];

  amenidadesSelected = [];

  files:File[]=[];
  previewImgs:any[]=[];

  constructor(private formBuilder: FormBuilder,private matSnackBar: MatSnackBar,
              private anuncioService: AnuncioService,private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.configForm();
  }

  changeMoneda(moneda) {
    this.registerAnuncioForm.get('moneda').setValue(moneda, { onlySelf: true });
  }

  configForm() {

    this.registerAnuncioForm = this.formBuilder.group({
      nombre: ['vendo casa en colonia santa fe', [Validators.required, Validators.minLength(10)]],
      moneda: ['USD', [Validators.required]],
      precio: [1, [Validators.min(1),Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      descripcion: ['vendo bonita casa en colonia santa, todo incluido', [Validators.required,Validators.minLength(10), Validators.maxLength(100)]],
      ubicacion:['El paraiso, Chalatenango',[Validators.required]],
      num_banios: [1, [Validators.required, Validators.min(0),Validators.pattern(/^\d+$/)]],
      num_habitaciones: [1, [Validators.required, Validators.min(0),Validators.pattern(/^\d+$/)]],
      num_estacionamientos: [0, [Validators.required, Validators.min(0),Validators.pattern(/^\d+$/)]],
    });
  }

  async registerAnuncio(formDirective:FormGroupDirective) {

    if(this.files.length<1){
      this.matSnackBar.open('Seleccione al menos una foto.','',{duration:3000})
      return;
    }

    if (this.registerAnuncioForm.valid) {
      await this.ngxSpinnerService.show();
      let registarData = this.registerAnuncioForm.value;

      const amenidades = {
        num_banios: registarData.num_banios,
        num_habitaciones: registarData.num_habitaciones,
        num_estacionamientos: registarData.num_estacionamientos
      }

      registarData = {
        ...registarData,
        amenidades: { ...amenidades, others: [...this.amenidadesSelected] }
      };

      this.anuncioService.registerAnuncio(this.files,registarData).subscribe(async(propertie:any)=>{
        formDirective.resetForm();
        this.registerAnuncioForm.reset();
        this.files =[];
        this.previewImgs = [];
        this.amenidadesSelected =[];
        this.matSnackBar.open('Anuncio registrado ','Ok',{duration:3000})
        await this.ngxSpinnerService.hide();
      },async (error)=>{
        console.log(error);
        this.matSnackBar.open('Cumpla con todos los requesitos (foto obligatoria)');
        await this.ngxSpinnerService.hide();
      })
    }


  }

  selectImg(file:File){

    if(this.files.length>=5){return;}

    if (!file || !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)){
      this.matSnackBar.open('Tipo de archivo no permitido','',{duration:3000});
    }else if(this.previewImgs.length<5){
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload=()=>{
        this.files.push(file);
        this.previewImgs.push(reader.result);
      }

    }
  }

  quitImg(indexImg:number){
    this.previewImgs.splice(indexImg,1);
    this.files.splice(indexImg,1);
  }

  // Mensajes de error del formulario
  getErrorNombreMessage() {
    if (this.registerAnuncioForm.get('nombre').hasError('required')) {
      return 'El nombre es requerido';
    }

    return this.registerAnuncioForm.get('nombre').hasError('minlength') ? 'El nombre es muy corto' : '';
  }

  getErrorMonedaMessage() {
    if (this.registerAnuncioForm.get('moneda').hasError('required')) {
      return 'El tipo de moneda es requerida.';
    }
    return null;
  }

  getErrorPrecioMessage() {
    if(this.registerAnuncioForm.get('precio').hasError('pattern')){
      return 'Debe ingresar un precio válido'
    }
    if (this.registerAnuncioForm.get('precio').hasError('min')) {
      return 'El precio tiene que ser mayo a 1';
    }

    return null;
  }

  getErrorDescripcionMessage() {
    const descripcion = this.registerAnuncioForm.get('descripcion');
    if (descripcion.hasError('required')) {
      return 'La descripcion es requerida';
    }
    if(descripcion.hasError('minlength')){
      return 'La descripcion debe tener más de 10 caractéres'
    }
    return descripcion.hasError('maxlength') ? 'La descripción debe tener menos de 100 caractéres' : '';
  }

  getErrorUbicacionMessage() {
    const ubicacion = this.registerAnuncioForm.get('ubicacion')
    if (ubicacion.hasError('required')) {
      return 'La ubicación es requerida';
    }
    return null;
  }

  getErrorNum_baniosMessage() {
    const num_banios = this.registerAnuncioForm.get('num_banios');
    if(num_banios.hasError('pattern')){
      return 'Debe ingresar un número entero'
    }
    if (num_banios.hasError('required')) {
      return 'El numero de baños es requerido';
    }

    return num_banios.hasError('min') ? 'El numero de baños debe ser cero o mayor a este' : '';
  }

  getErrorNum_habitacionesMessage() {
    const num_habitaciones = this.registerAnuncioForm.get('num_habitaciones');
    if(num_habitaciones.hasError('pattern')){
      return 'Debe ingresar un número entero'
    }
    if (num_habitaciones.hasError('required')) {
      return 'El numero de baños es requerido';
    }

    return num_habitaciones.hasError('min') ? 'El numero de habitaciones debe ser cero o mayor a este' : '';
  }

  getErrorNum_estacionamientosMessage() {
    const num_estacionamientos = this.registerAnuncioForm.get('num_estacionamientos');
    if(num_estacionamientos.hasError('pattern')){
      return 'Debe ingresar un número entero'
    }
    if (num_estacionamientos.hasError('required')) {
      return 'El numero de estacionamientos es requerido';
    }

    return num_estacionamientos.hasError('min') ? 'El numero de estacionamientos debe ser cero o mayor a este' : '';
  }

}
