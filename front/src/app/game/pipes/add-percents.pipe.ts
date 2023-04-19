import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addPercents'
})
export class AddPercentsPipe implements PipeTransform {

  transform(value: number): string {
    return `${value}%`;
  }

}
