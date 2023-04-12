import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services/jwt.service';

/**
 * Add JWT token header to all requests
 */
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) {}

  intercept<T, R>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<R>> {
    const headersConfig: {[key: string]: string} = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
