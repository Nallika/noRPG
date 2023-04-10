import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
   {
    path: 'game',
    loadChildren: () => import('./game/game.module').then(module => module.GameModule)
  },
  {
    path: 'ladder',
    loadChildren: () => import('./ladder/ladder.module').then(module => module.LadderModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
