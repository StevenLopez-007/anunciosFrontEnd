import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  @Input()withDot:boolean =false;

  @HostListener('keypress', ['$event'])
  onInput(event: any) {
    const pattern = this.withDot?/^[0-9]*\.?[0-9]*$/:/^[0-9]*$/; // without ., for integer only
    let inputChar = String.fromCharCode(event.which ? event.which : event.keyCode);

    if (!pattern.test(`${inputChar}`)) {
      // invalid character, prevent input
      event.preventDefault();
      return false;
    }
    return true;
  }


}
