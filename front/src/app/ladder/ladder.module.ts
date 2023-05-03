import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LadderRoutingModule } from './ladder-routing.module';
import { LadderPageComponent } from './components/ladder-page.component';
import { SharedModule } from '../shared/shared.module';
import { LadderEffects } from './store/effects';
import { LadderReducer } from './store/reducer';

/**
 * Module for ladder page
 */
@NgModule({
  declarations: [
    LadderPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([LadderEffects]),
    StoreModule.forFeature('ladder', LadderReducer),
    LadderRoutingModule
  ]
})
export class LadderModule { }
