import { Component, OnInit } from '@angular/core';

import { PlayerService } from './core/services/player.service';

/**
 * Main component, render layout and router-outlet
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{ 

  constructor(private playerService: PlayerService) {}

  /**
   * Auth player
   */
  ngOnInit() {
    this.playerService.populate();
  }
}
