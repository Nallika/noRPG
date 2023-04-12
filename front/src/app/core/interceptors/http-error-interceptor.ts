import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PopupService } from '../services/popup.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private popupService: PopupService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.popupService.openPopup({title: 'Error', content: 'Unexpected error occured, please reload page.'});
        return throwError(() => new Error(error.error));
      })
    )
  }
}
