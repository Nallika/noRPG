import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { BlackenedDirective } from './directives/blackened.directive';
import { GameTemplateComponent } from './game-template/game-template.component';


@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    HeaderComponent,
    BlackenedDirective,
    GameTemplateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    LogoComponent,
    HeaderComponent,
    GameTemplateComponent,
    BlackenedDirective
  ]
})
export class SharedModule { }
