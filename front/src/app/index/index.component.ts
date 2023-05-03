import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';

import { urlType } from '../types/generalTypes';
import { Store } from '@ngrx/store';
import { AppState } from '../types/storeTypes';

/**
 * Index page, display login/register or new game links
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
  isAuthenticated$: Observable<boolean> = this.store.select('auth', 'isAuthenticated').pipe(shareReplay(1));

  constructor (
    private router: Router,
    private store: Store<AppState>,
  ) { }

  goTo(url: urlType) {
    this.router.navigateByUrl(`/${url}`);
  }
}
