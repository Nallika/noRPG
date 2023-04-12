import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PopupService } from '../services/popup.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private popupService: PopupService) {}
  
  intercept<T, R>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<R>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.popupService.openPopup({title: 'Error', content: 'Unexpected error occured, please reload page.'});
        return throwError(() => new Error(error.error));
      })
    )
  }
}
