import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-stat-controll',
  template: `
    <div class="container">
      <div class="label">{{label}}</div>
      <div class="controll-wrap">
        <button (click)="changeValue(false)"><</button>
        <div class="value">{{value}}</div>
        <button (click)="changeValue(true)">></button>
      </div>
    </div>
  `,
  styleUrls: ['./stat-controll.component.scss']
})
export class StatControllComponent {
  @Input() label: string;
  @Input() value: number;
  @Input() template: TemplateRef<any>;
  @Output() changeValueEvent = new EventEmitter<number>();

  changeValue(type: boolean) {
    this.changeValueEvent.emit(type ? ++this.value : --this.value);
  }

}
