import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GameRoutingModule } from './game-routing.module';
import { NewCharPageComponent } from './pages/new-char-page/new-char-page.component';
import { CharPreviewPageComponent } from './pages/char-preview-page/char-preview-page.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';
import { SharedModule } from '../shared/shared.module';
import { AppearanceFormComponent } from './components/appearance-form/appearance-form.component';
import { StatFormComponent } from './components/stat-form/stat-form.component';
import { ItemsShopComponent } from './components/items-shop/items-shop.component';
import { StatControllComponent } from './components/stat-controll/stat-controll.component';
import { ItemComponent } from './components/item/item.component';
import { ResultStatComponent } from './components/result-stat/result-stat.component';
import { AddPercentsPipe } from './pipes/add-percents.pipe';
import { GameEffects } from './store/effects';
import { gameReducer } from './store/reducer';


/**
 * Gmae module. Here game components pages and forms
 */
@NgModule({
  declarations: [
    NewCharPageComponent,
    CharPreviewPageComponent,
    GameTabsComponent,
    AppearanceFormComponent,
    StatFormComponent,
    ItemsShopComponent,
    StatControllComponent,
    ItemComponent,
    ResultStatComponent,
    AddPercentsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GameRoutingModule,
    EffectsModule.forFeature([GameEffects]),
    StoreModule.forFeature('game', gameReducer),
    SharedModule
  ]
})
export class GameModule { }
