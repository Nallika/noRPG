import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { take , filter } from 'rxjs/operators';

import { player } from 'src/app/types';
import { PlayerService } from '../../core/services/player.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  
  activatedRoute: ActivatedRoute;
  isIndex: boolean;
  showLogo: boolean;
  nickname: string;

  constructor (
    private playerService: PlayerService,
    private router: Router,
    private location: Location
  ) {
    this.nickname = this.playerService.getCurrentPlayer().nickname;
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
     .subscribe((data: any) => {
      const path = data.url;
      this.isIndex = path === '/';
      this.showLogo = !(path === '/');
     });

     this.playerService.currentPlayer.subscribe(({ nickname }: player) => this.nickname = nickname);
  }

  goBack() {
    this.location.back();
  }
}
