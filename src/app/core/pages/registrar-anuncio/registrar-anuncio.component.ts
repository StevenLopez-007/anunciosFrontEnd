import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      moneda: ['', [Validators.required]],
      precio: [1, [Validators.min(1)]],
      descripcion: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(100)]],
      ubicacion:['',[Validators.required]],
      num_banios: [1, [Validators.required, Validators.min(0)]],
      num_habitaciones: [1, [Validators.required, Validators.min(0)]],
      num_estacionamientos: [0, [Validators.required, Validators.min(0)]],
    });
  }

  async registerAnuncio() {

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
        this.registerAnuncioForm.reset();
        this.files =[];
        this.previewImgs = [];
        this.amenidadesSelected =[];
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

}
