import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth.component';
import { AuthReducer } from './store/reducer';
import { AuthEffects } from './store/effects';

/**
 * Module for register and login user
 */
@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', AuthReducer),
    SharedModule
  ]
})
export class AuthModule { }
