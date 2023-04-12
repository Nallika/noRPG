import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Display provided stat value and 2 buttons for increase or disrease stat.
 */
@Component({
  selector: 'app-stat-controll',
  template: `
    <div class="label">{{label}}</div>
    <div class="controll-wrap">
      <button (click)="changeValue(false)" [disabled]="value === 1"><</button>
      <div class="value">{{value}}</div>
      <button (click)="changeValue(true)" [disabled]="increasDisabled">></button>
    </div>
  `,
  styleUrls: ['./stat-controll.component.scss']
})
export class StatControllComponent {
  @Input() label: string;
  @Input() value: number;
  @Input() increasDisabled: boolean | null;
  @Output() changeValueEvent = new EventEmitter<number>();

  changeValue(type: boolean) {
    this.changeValueEvent.emit(type ? ++this.value : --this.value);
  }

}
