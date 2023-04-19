import { Directive, HostBinding } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

/**
 * Mark text as for error
 */
@Directive({
  selector: '[appInputError]'
})
export class InpuiErrorDirective {
  @HostBinding('style')
  get myStyle(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      'color: brown; padding: 2px 0: black; position: absolute;'
    );
  }

  constructor(private sanitizer:DomSanitizer) {}
}
