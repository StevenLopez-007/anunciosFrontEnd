import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'getimg'
})
export class GetimgPipe implements PipeTransform {

  transform(photo:string){
    return `${base_url}/properties/getphoto/${photo}`
  }

}
