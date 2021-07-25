import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetimgPipe } from './pipes/getimg.pipe';
import { RegistrarAnuncioComponent } from './registrar-anuncio/registrar-anuncio.component';
import { ComponentsModule } from '../components/components.module';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [PagesComponent,AnunciosComponent, GetimgPipe, RegistrarAnuncioComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    SwiperModule
  ]
})
export class PagesModule { }
