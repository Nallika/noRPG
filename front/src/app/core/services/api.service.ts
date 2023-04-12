import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/app/environments/environment';

export const BASE_ERROR_TEXT = 'Error occured';

/**
 * Service for send api requests
 */
@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {}

  get<R>(path: string, params: HttpParams = new HttpParams()): Observable<R> {
    return this.http.get<R>(`${environment.api_url}${path}`, { params });
  }

  put<T, R>(path: string, body: T): Observable<R> {
    return this.http.put<R>(`${environment.api_url}${path}`, JSON.stringify(body));
  }

  post<T, R>(path: string, body: T): Observable<R> {
    return this.http.post<R>(`${environment.api_url}${path}`, JSON.stringify(body));
  }

  delete<R>(path: string): Observable<R> {
    return this.http.delete<R>(`${environment.api_url}${path}`);
  }
}
