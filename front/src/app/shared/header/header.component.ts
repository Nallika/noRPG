import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { PlayerService } from '../../core/services/player.service';
import { Observable } from 'rxjs';

/**
 * App header with back and logut buttons
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  activatedRoute: ActivatedRoute;
  isIndex: boolean;
  showLogo: boolean;
  nickname$: Observable<string>;

  @ViewChild('dropdown') dropdown: ElementRef; 

  constructor (
    private playerService: PlayerService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((data: any) => {
      const path = data.url;
      this.isIndex = path === '/';
      this.showLogo = !['/', '/login', '/register'].includes(path);
    });

    this.nickname$ = this.playerService.currentPlayer.pipe(
      map(currentPlayer => currentPlayer.nickname)
    );
  }

  goBack() {
    this.location.back();
  }

  /**
   * Display logout button
   */
  toggleDropdown() {
    this.dropdown.nativeElement.classList.toggle('toggle-dropdown');
  }

  logout() {
    this.playerService.logout();
    this.router.navigateByUrl('/');
  }
}
