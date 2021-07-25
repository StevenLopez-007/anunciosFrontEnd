import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RegistrarAnuncioComponent } from './registrar-anuncio/registrar-anuncio.component';

const routes: Routes = [
  {
    path:'anuncios',
    canActivate:[AuthGuard],
    component:AnunciosComponent
  },
  {
    path:'registrar-anuncio',
    canActivate:[AuthGuard],
    component:RegistrarAnuncioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
