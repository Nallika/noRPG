import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

import { environment } from 'src/app/environments/environment';
import { catchError } from 'rxjs/operators';

export const BASE_ERROR_TEXT = 'Error occured';

/**
 * Service for send api requests
 */
@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {}

  private formatError(error: any) {
    const errorText = typeof error.error === 'string' ? error.error : BASE_ERROR_TEXT;
    return throwError(() => new Error(errorText));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatError));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatError));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatError));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatError));
  }
}
