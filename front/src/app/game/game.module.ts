import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GameRoutingModule } from './game-routing.module';
import { NewCharPageComponent } from './pages/new-char-page/new-char-page.component';
import { CharPreviewPageComponent } from './pages/char-preview-page/char-preview-page.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';
import { SharedModule } from "../shared/shared.module";
import { AppearanceFormComponent } from './components/appearance-form/appearance-form.component';
import { StatFormComponent } from './components/stat-form/stat-form.component';
import { ItemsShopComponent } from './components/items-shop/items-shop.component';


@NgModule({
    declarations: [
        NewCharPageComponent,
        CharPreviewPageComponent,
        GameTabsComponent,
        AppearanceFormComponent,
        StatFormComponent,
        ItemsShopComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        GameRoutingModule,
        SharedModule
    ]
})
export class GameModule { }
