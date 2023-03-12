import { Directive } from '@angular/core';

@Directive({
  selector: '[blackened]',
  host: {
    '[style.color]': '"white"',
    '[style.border]': '"2px solid white"',
    '[style.background-color]': '"black"',
    '[style.outline]': '"none"'
  }
})
export class BlackenedDirective { }
