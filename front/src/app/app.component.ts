import { Component, OnInit } from '@angular/core';
import { AppState } from './types/storeTypes';
import { Store } from '@ngrx/store';
import { populate } from './auth/store/actions';

/**
 * Main component, render layout and router-outlet
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{ 

  constructor(private store: Store<AppState>) {}

  /**
   * Auth player
   */
  ngOnInit() {
    this.store.dispatch(populate());
  }
}
