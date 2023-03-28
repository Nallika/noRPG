import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from '../core/services/player.service';
import { urlType } from '../types/generalTypes';

/**
 * Index page, display login/register or new game links
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isAuthenticated: boolean;

  constructor (
    private router: Router,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.playerService.isAuthenticated.subscribe( value => this.isAuthenticated = value)
  }

  goTo(url: urlType) {
    this.router.navigateByUrl(`/${url}`);
  }
}
