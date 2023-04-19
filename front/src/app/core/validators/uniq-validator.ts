import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

/**
 * Validator for check is particular field (name, email, nickname) value already taken
 */
export const uniqValidator = {
  validate: function (apiService: ApiService, field: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      
      return apiService.post('/validate', {field, value: control.value}).pipe(
        map(result => {
          if (!result) {
            return { [`${field}AlreadyExists`]: true };
          } else {
            return null;
          }
        })
      );
    };
  }
}