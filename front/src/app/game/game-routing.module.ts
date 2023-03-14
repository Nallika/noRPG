import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewCharPageComponent } from './pages/new-char-page/new-char-page.component';
import { CharStatPageComponent } from './pages/char-stat-page/char-stat-page.component';
import { CharPreviewPageComponent } from './pages/char-preview-page/char-preview-page.component';


const routes: Routes = [
  {
    path: 'newChar',
    component: NewCharPageComponent,
  },
  {
    path: 'charStat',
    component: CharStatPageComponent,
  },
  {
    path: 'charPreview',
    component: CharPreviewPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
