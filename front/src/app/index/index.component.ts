import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';

import { PlayerService } from '../core/services/player.service';
import { urlType } from '../types/generalTypes';

/**
 * Index page, display login/register or new game links
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor (
    private router: Router,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.isAuthenticated$ = this.playerService.isAuthenticated.pipe(shareReplay(1));
  }

  goTo(url: urlType) {
    this.router.navigateByUrl(`/${url}`);
  }
}
