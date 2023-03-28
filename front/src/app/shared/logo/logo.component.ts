import { Component, Input } from '@angular/core';

/**
 * Display logo in 2 variants
 */
@Component({
  selector: 'app-logo',
  template: `
    <div class="logo" [ngClass]="{'large': large}">NO RPG</div>
  `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() large: boolean
}
