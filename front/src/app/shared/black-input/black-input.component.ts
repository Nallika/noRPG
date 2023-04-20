import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-black-input',
  template: `
    <input type={{type}} [value]="value" (input)="onChange($event)" (blur)="onTouched()" />
  `,
  styleUrls: ['./black-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BlackInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlackInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'password';

  value: string;

  constructor(private cdr: ChangeDetectorRef) { }

  onChange: (event: Event) => void;
  onTouched: () => void;

  writeValue(value: string): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      fn(value);
    };
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
