import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';
import { EditAnuncioComponent } from './edit-anuncio/edit-anuncio.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../pages/pipes/pipes.module';

@NgModule({
  declarations: [HeaderComponent, EditAnuncioComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule,
    PipesModule
  ],
  exports:[HeaderComponent]
})
export class ComponentsModule { }
