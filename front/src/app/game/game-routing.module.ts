import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth-guard.service';
import { NewCharPageComponent } from './pages/new-char-page/new-char-page.component';
import { CharPreviewPageComponent } from './pages/char-preview-page/char-preview-page.component';


const routes: Routes = [
  {
    path: 'newChar',
    component: NewCharPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'charPreview',
    component: CharPreviewPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
