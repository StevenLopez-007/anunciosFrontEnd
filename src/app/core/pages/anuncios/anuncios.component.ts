import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Anuncio } from '../../../interfaces/anuncio';
import { AnuncioService } from '../../../services/anuncio.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  anuncios:Anuncio[]=[];

  constructor(private anuncioService: AnuncioService,private ngxSpinnerService: NgxSpinnerService) { }

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

}
