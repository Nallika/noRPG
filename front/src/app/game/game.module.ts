import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { NewCharPageComponent } from './pages/new-char-page/new-char-page.component';
import { CharStatPageComponent } from './pages/char-stat-page/char-stat-page.component';
import { CharPreviewPageComponent } from './pages/char-preview-page/char-preview-page.component';


@NgModule({
  declarations: [
    NewCharPageComponent,
    CharStatPageComponent,
    CharPreviewPageComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
