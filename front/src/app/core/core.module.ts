import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { ApiService } from './services/api.service';
import { JwtService } from './services/jwt.service';
import { AuthGuard } from './guards/auth-guard.service';
import { NoAuthGuard } from './guards/no-auth-guard.service';
import { PlayerService } from './services/player.service';
import { CharService } from './services/char.service';
import { GameLoaderService } from './services/game-loader.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    JwtService,
    PlayerService,
    GameLoaderService,
    CharService,
    AuthGuard,
    NoAuthGuard
  ]
})
export class CoreModule { }
