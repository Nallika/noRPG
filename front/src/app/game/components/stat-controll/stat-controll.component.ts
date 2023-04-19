import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Display provided stat value and 2 buttons for increase or disrease stat.
 */
@Component({
  selector: 'app-stat-controll',
  template: `
    <div class="label">{{label}}</div>
    <div class="controll-wrap">
      <button data-test="descrease" (click)="changeValue(false)" [disabled]="value === 1"><</button>
      <div class="value">{{value}}</div>
      <button data-test="increase" (click)="changeValue(true)" [disabled]="increaseDisabled">></button>
    </div>
  `,
  styleUrls: ['./stat-controll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatControllComponent {
  @Input() label: string;
  @Input() value: number;
  @Input() increaseDisabled: boolean | null;
  @Output() changeValueEvent = new EventEmitter<number>();

  changeValue(increase: boolean) {
    if (this.increaseDisabled && increase) {
      return;
    }

    this.changeValueEvent.emit(increase ? ++this.value : --this.value);
  }

}
