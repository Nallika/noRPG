import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth-guard';
import { NewCharPageComponent } from './pages/new-char-page/new-char-page.component';
import { CharPreviewPageComponent } from './pages/char-preview-page/char-preview-page.component';
import { LeaveGameGuard } from '../core/guards/leave-game-guard';


const routes: Routes = [
  {
    path: '',
    component: NewCharPageComponent,
    canActivate: [AuthGuard],
    canDeactivate: [LeaveGameGuard]
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
