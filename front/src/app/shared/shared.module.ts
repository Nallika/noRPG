import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { FieldComponent } from './field/field.component';
import { BlackenedDirective } from './directives/blackened.directive';



@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    HeaderComponent,
    FieldComponent,
    BlackenedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    LogoComponent,
    FieldComponent,
    BlackenedDirective
  ]
})
export class SharedModule { }
