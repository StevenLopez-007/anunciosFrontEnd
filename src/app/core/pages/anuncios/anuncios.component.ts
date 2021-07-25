import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Anuncio } from '../../../interfaces/anuncio';
import { AnuncioService } from '../../../services/anuncio.service';
import { EditAnuncioComponent } from '../../components/edit-anuncio/edit-anuncio.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  anuncios:Anuncio[]=[];

  constructor(private anuncioService: AnuncioService,
              private ngxSpinnerService: NgxSpinnerService,
              private matDialog: MatDialog,
              private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAnuncios();
    document.body.style.backgroundColor="var(--bg-color1)"
  }

  async getAnuncios(){
    await this.ngxSpinnerService.show();
    this.anuncioService.getAnuncios().subscribe(async(anuncios:Anuncio[])=>{
      this.anuncios = anuncios;
      await this.ngxSpinnerService.hide();
    },async(error)=>{
      console.log(error)
      await this.ngxSpinnerService.hide();
    })
  }

  async editAnuncio(anuncio:Anuncio,index:number){
    const dialogEditAnuncio = this.matDialog.open(EditAnuncioComponent,{
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data:{
        anuncio
      }
    });

    dialogEditAnuncio.afterClosed().subscribe(edited=>{
      if(edited){
        this.getAnuncios();
      }
    });
  }

  async deleteAnuncio(idAdd:string,i:number){
    await this.ngxSpinnerService.show();
    this.anuncioService.deleteAnuncio(idAdd).subscribe(async(resp)=>{
      this.anuncios.splice(i,1);
      await this.ngxSpinnerService.hide();
    },async(error)=>{
      await this.ngxSpinnerService.hide();
      this.matSnackBar.open(error.error.mgs,'',{duration:3000});
    })
  }
}
