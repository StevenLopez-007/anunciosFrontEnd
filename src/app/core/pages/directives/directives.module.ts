import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-number.directive';



@NgModule({
  declarations: [OnlyNumberDirective],
  imports: [],
  exports:[OnlyNumberDirective]
})
export class DirectivesModule { }
