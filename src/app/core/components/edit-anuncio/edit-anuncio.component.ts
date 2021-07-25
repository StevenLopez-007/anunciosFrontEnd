import { NgxSpinnerService } from 'ngx-spinner';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Anuncio } from 'src/app/interfaces/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-anuncio',
  templateUrl: './edit-anuncio.component.html',
  styleUrls: ['../../pages/registrar-anuncio/registrar-anuncio.component.scss', './edit-anuncio.component.scss']
})
export class EditAnuncioComponent implements OnInit {

  anuncio: Anuncio;

  editAnuncioForm: FormGroup;

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

  previewImgs: any[] = [];

  edited = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { anuncio: Anuncio }, private formBuilder: FormBuilder,
    private anuncioService: AnuncioService, private ngxSpinnerService: NgxSpinnerService, private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditAnuncioComponent>) {
    this.anuncio = data.anuncio;
    this.amenidadesSelected = this.anuncio.amenidades.others;
    setTimeout(() => { this.previewImgs = this.anuncio.photos; }, 1500)
    this.configForm();
  }

  ngOnInit(): void {
  }

  changeMoneda(moneda) {
    this.editAnuncioForm.get('moneda').setValue(moneda, { onlySelf: true });
  }

  async editAuncio() {
    if (this.editAnuncioForm.valid) {
      await this.ngxSpinnerService.show();
      let editData = this.editAnuncioForm.value;

      const amenidades = {
        num_banios: editData.num_banios,
        num_habitaciones: editData.num_habitaciones,
        num_estacionamientos: editData.num_estacionamientos
      }

      editData = {
        ...editData,
        amenidades: { ...amenidades, others: [...this.amenidadesSelected] }
      };

      this.anuncioService.editAnuncio(this.anuncio._id, editData).subscribe(async (propertie: any) => {
        this.edited = true;
        await this.ngxSpinnerService.hide();
      }, async (error) => {
        this.matSnackBar.open('Algunos datos no se pudieron actualizar', '', { duration: 3000 });
        await this.ngxSpinnerService.hide();
      })
    }
  }

  async quitImg(i: number, img: string) {
    if (this.previewImgs.length == 1) {
      await this.ngxSpinnerService.show();
      this.anuncioService.quitImg(this.anuncio._id, img)
        .subscribe(async (resp: any) => {
          this.previewImgs.splice(i, 1);
          this.edited = true;
          await this.ngxSpinnerService.hide();
        }, async (error) => {
          this.matSnackBar.open(error.error.msg, '', { duration: 3000 });
          await this.ngxSpinnerService.hide();
        })
    }
  }

  selectImg(file: File) {
    if (this.previewImgs.length >= 5) { return; }
    if (!file || !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      this.matSnackBar.open('Tipo de archivo no permitido', '', { duration: 3000 });
    } else if (this.previewImgs.length < 5) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {

        this.addPhoto(file);
      }

    }
  }

  async addPhoto(file: File) {

    await this.ngxSpinnerService.show();
    this.anuncioService.addPhoto(this.anuncio._id, file)
      .subscribe(async (img) => {
        this.edited = true;
        this.previewImgs.push(img);
        await this.ngxSpinnerService.hide();
      }, async (error) => {
        this.matSnackBar.open(error.error.msg, '', { duration: 3000 });
        await this.ngxSpinnerService.hide();
      });

  }

  configForm() {
    this.editAnuncioForm = this.formBuilder.group({
      nombre: [this.anuncio.nombre, [Validators.required, Validators.minLength(10)]],
      moneda: [this.anuncio.moneda, [Validators.required]],
      precio: [this.anuncio.precio, [Validators.min(1)]],
      descripcion: [this.anuncio.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      ubicacion: [this.anuncio.ubicacion, [Validators.required]],
      num_banios: [this.anuncio.amenidades.num_banios, [Validators.required, Validators.min(0)]],
      num_habitaciones: [this.anuncio.amenidades.num_habitaciones, [Validators.required, Validators.min(0)]],
      num_estacionamientos: [this.anuncio.amenidades.num_estacionamientos, [Validators.required, Validators.min(0)]],
    });
  }

  close() {
    this.dialogRef.close(this.edited);
  }

}
