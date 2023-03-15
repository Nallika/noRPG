import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { PlayerService } from '../core/services/player.service';
import { urlType } from '../types';

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
