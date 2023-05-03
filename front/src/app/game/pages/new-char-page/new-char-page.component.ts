import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { GameState } from 'src/app/types/storeTypes';
import { PopupService } from 'src/app/core/services/popup.service';
import { getGameData, generateChar, submitChar } from '../../store/actions';

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
  canLeave: boolean;
  
  constructor (
    private router: Router,
    private store: Store<{game: GameState}>,
    private popupService: PopupService,
  ) {
    this.canLeave = false;
  }

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
   * Show help popup
   */
  showHelp(): void {
    this.popupService.openPopup({
      title: 'How to play',
      content: `It's simple, create your character by filling name and distribute stat values.
        After that game will calculate additional characteristics such as hit/dodge chanse and damage.
        Also character rating will be calculated and you will see your result.`
    });
  }

  canExit(): boolean {
    return this.canLeave || confirm('Do you really want to leave ?, changes wouldn\'t saved');
  }

  /**
   * Submit char to server and go to preview page
   */
  submitHandler() {
    this.canLeave = true;
    this.store.dispatch(submitChar());
    this.router.navigateByUrl('/game/charPreview');
  }
}
