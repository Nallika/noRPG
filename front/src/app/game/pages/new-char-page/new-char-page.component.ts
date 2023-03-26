import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { charState, gameState } from 'src/app/types/storeTypes';
import { getGameData } from 'src/app/store/actions/gameActions';
import { submitChar } from 'src/app/store/actions/charActions';

@Component({
  selector: 'app-new-char-page',
  templateUrl: './new-char-page.component.html',
  styleUrls: ['./new-char-page.component.scss']
})
export class NewCharPageComponent {
  loading$: Observable<boolean>;
  error$: Observable<string>;
  
  constructor (
    private gameStore: Store<{game: gameState}>,
    private charStore: Store<{char: charState}>,
  ) {
    this.loading$ = gameStore.select('game', 'loading');
    this.error$ = gameStore.select('game', 'error');
    this.gameStore.dispatch(getGameData());
  }

  submitHandler() {
    this.charStore.dispatch(submitChar());
  }
}
