import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { gameState } from 'src/app/types/storeTypes';
import { getGameData } from 'src/app/store/actions/gameActions';
import { submitChar, generateChar } from 'src/app/store/actions/gameActions';

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
    private router: Router,
    private store: Store<{game: gameState}>,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select('game', 'loading');
    this.error$ = this.store.select('game', 'error');

    // Get general game data(races, items), display loading until it's loaded
    this.store.dispatch(getGameData());

    // Randomize base character values to display in forms, run only on page loaded
    this.loading$.pipe(
      take(2),
      filter((val) => !val)
    ).subscribe(() => this.store.dispatch(generateChar()));
  }

  /**
   * Submit char to server and go to preview page
   */
  submitHandler() {
    this.store.dispatch(submitChar());
    this.router.navigateByUrl('/game/charPreview');
  }
}
