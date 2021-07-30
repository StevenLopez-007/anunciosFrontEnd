import { NgModule } from '@angular/core';
import { GetimgPipe } from './getimg.pipe';
import { UpperfirstcasePipe } from './upperfirstcase.pipe';

@NgModule({
  declarations: [GetimgPipe, UpperfirstcasePipe],
  imports: [
  ],
  exports:[GetimgPipe,UpperfirstcasePipe]
})
export class PipesModule { }
