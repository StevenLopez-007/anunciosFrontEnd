import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports:[HeaderComponent]
})
export class ComponentsModule { }
