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

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    );
  }
}
