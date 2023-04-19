import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * Stylized button
 */
@Component({
  selector: 'app-button',
  template: `
    <div class="wrap">
      <div class="outer-border">
        <div class="button">{{ title }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() title: string;
}
