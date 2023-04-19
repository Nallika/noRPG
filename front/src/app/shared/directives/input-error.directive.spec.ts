import { InpuiErrorDirective } from './input-error.directive';
import { DomSanitizer } from '@angular/platform-browser';

describe('InpuiErrorDirective', () => {
  let sanitizer: DomSanitizer;

  it('should create an instance', () => {
    const directive = new InpuiErrorDirective(sanitizer);
    expect(directive).toBeTruthy();
  });
});
