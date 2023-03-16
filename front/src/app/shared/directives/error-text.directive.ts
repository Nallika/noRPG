import { Directive } from '@angular/core';

@Directive({
  selector: '[appErrorText]',
  host: {
    '[style.color]': '"brown"',
    '[style.padding]': '"2px 0"',
    '[style.position]': '"absolute"'
  }
})
export class ErrorTextDirective {

  constructor() { }
}
