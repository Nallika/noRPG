import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { BlackenedDirective } from './directives/blackened.directive';
import { ErrorTextDirective } from './directives/error-text.directive';
import { GameTemplateComponent } from './game-template/game-template.component';
import { IndexTemplateComponent } from './index-template/index-template.component';
import { LoaderComponent } from './loader/loader.component';

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
    BlackenedDirective,
    ErrorTextDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    LogoComponent,
    HeaderComponent,
    GameTemplateComponent,
    IndexTemplateComponent,
    LoaderComponent,
    BlackenedDirective,
    ErrorTextDirective
  ]
})
export class SharedModule { }
