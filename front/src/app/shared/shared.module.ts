import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { InpuiErrorDirective } from './directives/input-error.directive';
import { GameTemplateComponent } from './game-template/game-template.component';
import { IndexTemplateComponent } from './index-template/index-template.component';
import { LoaderComponent } from './loader/loader.component';
import { EnterTheViewportDirective } from './directives/enter-the-viewport.directive';
import { PopupComponent } from './popup/popup.component';
import { BlackInputComponent } from './black-input/black-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * General use module, here store reused components
 */
@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    HeaderComponent,
    GameTemplateComponent,
    IndexTemplateComponent,
    LoaderComponent,
    PopupComponent,
    BlackInputComponent,
    InpuiErrorDirective,
    EnterTheViewportDirective,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ButtonComponent,
    LogoComponent,
    HeaderComponent,
    GameTemplateComponent,
    IndexTemplateComponent,
    LoaderComponent,
    PopupComponent,
    BlackInputComponent,
    InpuiErrorDirective,
    EnterTheViewportDirective,
  ],
})
export class SharedModule { }
