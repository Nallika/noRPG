import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { gameState } from 'src/app/types/storeTypes';
import { getGameData } from 'src/app/store/actions/gameActions';
import { submitChar, generateChar } from 'src/app/store/actions/gameActions';
import { filter } from 'rxjs';

/**
 * Char creation page.
 * Here we display tabs with forms for creating char and filling attributes.
 */
@Component({
  selector: 'app-new-char-page',
  templateUrl: './new-char-page.component.html',
  styleUrls: ['./new-char-page.component.scss']
})
export class NewCharPageComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<string>;
  
  constructor (
    private store: Store<{game: gameState}>,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select('game', 'gameData', 'loading');
    this.error$ = this.store.select('game', 'gameData', 'error');

    // Get general game data(races, items), display loading until it's loaded
    this.store.dispatch(getGameData());

    // Randomize base character values to display in forms
    this.loading$.pipe(
      filter((val) => !val)
    ).subscribe(() => this.store.dispatch(generateChar()))
  }

  /**
   * Submit char to server
   * TODO: add navigation to preview page
   */
  submitHandler() {
    this.store.dispatch(submitChar());
  }
}
