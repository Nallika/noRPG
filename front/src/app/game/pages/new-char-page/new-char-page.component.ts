import { Component, OnInit,  } from '@angular/core';

import { GameLoaderService } from 'src/app/core/services/game-loader.service';

@Component({
  selector: 'app-new-char-page',
  templateUrl: './new-char-page.component.html',
  styleUrls: ['./new-char-page.component.scss']
})
export class NewCharPageComponent implements OnInit {
  
  constructor (
    private gameService: GameLoaderService
  ) { }

  ngOnInit() {
    this.gameService.loadGameData();
  }
}
