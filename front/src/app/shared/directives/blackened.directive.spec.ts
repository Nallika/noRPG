import { BlackenedDirective } from './blackened.directive';
import { DomSanitizer } from '@angular/platform-browser';

describe('BlackenedDirective', () => {
  let sanitizer: DomSanitizer;

  it('should create an instance', () => {
    const directive = new BlackenedDirective(sanitizer);
    expect(directive).toBeTruthy();
  });
});
