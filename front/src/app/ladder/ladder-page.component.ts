import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLadder, resetLadder } from 'src/app/store/actions/gameActions';
import { gameState } from 'src/app/types/storeTypes';
import { ladder, ladderChar } from 'src/app/types/ladderTypes';
import { filter, Observable, take } from 'rxjs';

/**
 * Display ladder table, load more rows on scroll
 */
@Component({
  selector: 'app-ladder-page',
  templateUrl: './ladder-page.component.html',
  styleUrls: ['./ladder-page.component.scss'],
})
export class LadderPageComponent {

  loading$: Observable<boolean>;
  isFull$: Observable<boolean>;
  ladder: ladder;

  constructor (
    private store: Store<{game: gameState}>,
  ) {}

  ngOnInit(): void {
    this.ladder = [];
    this.loading$ = this.store.select('game', 'loading');
    this.isFull$ = this.store.select('game', 'ladderData', 'isFull');
    this.store.select('game', 'ladderData', 'ladderChunk').subscribe(ladderChunk => this.ladder.push(...ladderChunk));
    this.store.dispatch(getLadder());
  }

  /**
   * Clear pagination on destroy
   */
  ngOnDestroy(): void {
    this.store.dispatch(resetLadder());
  }

  /**
   * Call loadLadder when user scrolled to the end of table.
   * For check scroll @appEnterTheViewport directive used.
   */
  handleLoadMore($event: boolean) {
    if ($event) {
      this.loadLadder();
    }
  }

  /**
   * Load ladder only if current loadin state is false
   */
  loadLadder() {
    this.loading$.pipe(
      take(1),
      filter(loading => !loading)
    ).subscribe(() => {
      this.store.dispatch(getLadder());
    });
  }

  /**
   * Optimize table row rendering
   */
  trackByFn(_: number, item: ladderChar) {
    return item.name;
  }
}
