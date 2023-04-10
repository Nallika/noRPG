import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LadderPageComponent } from './ladder-page.component';

const routes: Routes = [
  {
    path: '',
    component: LadderPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LadderRoutingModule { }
