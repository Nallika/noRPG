import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

/**
 * Service for check is email/nickname/name already taken, used for uniqValidator
 */
@Injectable({
  providedIn: 'root'
})
export class CheckUniqValueService {

  constructor (private apiService: ApiService) {}

  public checkIsUniq(field: string, value: string): Observable<boolean> {
    return this.apiService.post('/validate', {field, value})
      .pipe(
        catchError(async () => false)
      );
  }
}
