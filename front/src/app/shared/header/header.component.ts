import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { AppState } from 'src/app/types/storeTypes';
import { logout } from 'src/app/auth/store/actions';

/**
 * App header with back and logut buttons
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  private destroyed$ = new Subject<void>();
  activatedRoute: ActivatedRoute;
  isIndex: boolean;
  showLogo: boolean;
  nickname$: Observable<string> = this.store.select('auth', 'player', 'nickname');

  @ViewChild('dropdown') dropdown: ElementRef; 

  constructor (
    private store: Store<AppState>,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroyed$)
    ).subscribe((data: any) => {
      const path = data.url;
      this.isIndex = path === '/';
      this.showLogo = !['/', '/login', '/register'].includes(path);
    });
  }

  /**
   * Clear subscription on destroy
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
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
    this.store.dispatch(logout());
    this.router.navigateByUrl('/');
  }
}
