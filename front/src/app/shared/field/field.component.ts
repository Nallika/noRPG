import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-field',
  template: `
  <div class="wrap">
    <label class="label" *ngIf="!!label">{{label}}</label>
    <input 
      [name]="name"
      class="field"
      type="text"
    >
  </div>
  `,
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  @Input() name: string;
  @Input() label?: string;
}
