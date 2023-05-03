import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { ApiService } from './services/api.service';
import { JwtService } from './services/jwt.service';
import { AuthGuard } from './guards/auth-guard';
import { NoAuthGuard } from './guards/no-auth-guard';
import { PopupService } from './services/popup.service';
import { LeaveGameGuard } from './guards/leave-game-guard';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';

/**
 * Module for general use services, including interceptors and guards
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ApiService,
    JwtService,
    PopupService,
    AuthGuard,
    NoAuthGuard,
    LeaveGameGuard
  ]
})
export class CoreModule { }
