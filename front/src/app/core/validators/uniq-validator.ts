import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckUniqValueService } from './check-uniq-value.service';

/**
 * Validator for check is particular field (name, email, nickname) value already taken
 */
export function uniqValidator (checkUniqValueService: CheckUniqValueService, field: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    
    return checkUniqValueService.checkIsUniq(field, control.value).pipe(
      map(result => {
        console.log('uniqValidator responce ', result);
        if (!result) {
          return { [`${field}AlreadyExists`]: true };
        } else {
          return null;
        }
      })
    );
  };
}


