import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { player } from 'src/app/types';
import { PlayerService } from '../../core/services/player.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  activatedRoute: ActivatedRoute;
  isIndex: boolean;
  showLogo: boolean;
  nickname: string;

  @ViewChild('dropdown') dropdown: ElementRef; 

  constructor (
    private playerService: PlayerService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
     .subscribe((data: any) => {
      const path = data.url;
      this.isIndex = path === '/';
      this.showLogo = !['/', '/login', '/register'].includes(path);
     });

     this.playerService.currentPlayer.subscribe(({ nickname }: player) => this.nickname = nickname);
  }

  goBack() {
    this.location.back();
  }

  toggleDropdown() {
    this.dropdown.nativeElement.classList.toggle('toggle-dropdown');
  }

  logout() {
    this.playerService.logout();
  }
}
