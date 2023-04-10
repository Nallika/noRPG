import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LadderRoutingModule } from './ladder-routing.module';
import { LadderPageComponent } from './ladder-page.component';
import { SharedModule } from '../shared/shared.module';

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
    LadderRoutingModule
  ]
})
export class LadderModule { }
