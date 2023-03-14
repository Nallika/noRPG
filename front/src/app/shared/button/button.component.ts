import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
  <div class="wrap">
    <div class="outer-border">
      <div class="button">{{ title }}</div>
    </div>
  </div>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() title: string;
}
