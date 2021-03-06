import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anuncio } from '../interfaces/anuncio';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private httpClient: HttpClient) { }

  getAnuncios(){
    return this.httpClient.get<Anuncio[]>(`${base_url}/properties`).pipe(
      map((anuncios:any)=>anuncios.properties)
    )
  }

  registerAnuncio(files:any[],registerAnuncioData:any){

    const formData = new FormData()

    formData.append('nombre',registerAnuncioData.nombre);
    formData.append('moneda',registerAnuncioData.moneda);
    formData.append('precio',registerAnuncioData.precio);
    formData.append('descripcion',registerAnuncioData.descripcion);
    formData.append('amenidades',JSON.stringify(registerAnuncioData.amenidades));
    formData.append('ubicacion',registerAnuncioData.ubicacion);

    if(files.length==1){
      formData.append('photos',files[0])
    }else{
      files.forEach((file)=>{
        formData.append('photos',file)
      });
    }

    return this.httpClient.post(`${base_url}/properties`,formData).pipe(
      map((resp:any)=>resp.propertie)
    )

  }

  editAnuncio(idAdd:string,editAnuncioData:any){
    return this.httpClient.put(`${base_url}/properties/${idAdd}`,{...editAnuncioData}).pipe(
      map((resp:any)=>resp.propertie)
    )
  }

  quitImg(idAdd:string,namePhoto:string){
    return this.httpClient.post(`${base_url}/properties/deletephoto/${idAdd}`,{namePhoto});
  }

  addPhoto(idAdd:string,photo:File){

    const formData = new FormData();
    formData.append('photo',photo);

    return this.httpClient.post(`${base_url}/properties/addphoto/${idAdd}`,formData).pipe(
      map((resp:any)=>resp.img)
    );

  }

  deleteAnuncio(idAdd:string){
    return this.httpClient.delete(`${base_url}/properties/${idAdd}`)
  }
}
