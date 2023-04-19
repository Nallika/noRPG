import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-stat',
  template: `
    <div class="container">
      <div class="title">{{title}}</div>
      <div class="value">{{value}}</div>
    </div>
  `,
  styleUrls: ['./result-stat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultStatComponent {
  @Input() title: string
  @Input() value: string | number | null
}
