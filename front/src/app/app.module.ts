import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { gameReducer } from './store/reducers/gameReducer';
import { GameEffects } from './store/effects/gameEffects';
import { charReducer } from './store/reducers/charReducer';
import { CharEffects } from './store/effects/charEffects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    CoreModule,
    AuthModule,
    SharedModule,
    StoreModule.forRoot({game: gameReducer, char: charReducer}),
    EffectsModule.forRoot([GameEffects, CharEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
