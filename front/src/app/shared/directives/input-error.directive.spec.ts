import { ErrorTextDirective } from './input-error.directive';
import { DomSanitizer } from '@angular/platform-browser';

describe('BlackenedDirective', () => {
  let sanitizer: DomSanitizer;

  it('should create an instance', () => {
    const directive = new ErrorTextDirective(sanitizer);
    expect(directive).toBeTruthy();
  });
});
