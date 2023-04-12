import { Directive } from '@angular/core';

/**
 * Mark text as for error
 */
@Directive({
  selector: '[appInputError]',
  host: {
    '[style.color]': '"brown"',
    '[style.padding]': '"2px 0"',
    '[style.position]': '"absolute"'
  }
})
export class ErrorTextDirective {

  constructor() { }
}
