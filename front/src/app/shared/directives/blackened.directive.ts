import { Directive, HostBinding } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

/**
 * Stylize input in black
 */
@Directive({
  selector: '[appBlackened]',
})
export class BlackenedDirective {
  @HostBinding('style')
  get myStyle(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      'color: white; border: 2px solid white; background-color: black; outline: none;'
    );
  }

  constructor(private sanitizer:DomSanitizer) {}
}
