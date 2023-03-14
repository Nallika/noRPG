import { Component, OnInit } from '@angular/core';

import { PlayerService } from './core/services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{ 

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.populate();
  }
}
