import { Component, Input } from '@angular/core';

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
