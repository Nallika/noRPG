import { Component } from '@angular/core';

/**
 * Component for display and switch character create tabs.
 * There are 3 tabs - appearance, stats, items.
 */
@Component({
  selector: 'app-game-tabs',
  template: `
    <div class="container">
      <div class="tab-list" role="tablist">
          <button *ngFor="let tab of tabs" class="tab" [ngClass]="{'active': tab === activeTab}" (click)="openTab(tab)">{{tab}}</button>
        </div>
      <div class="content">
        <div [ngSwitch]="activeTab">
          <div *ngSwitchCase="'Appearance'">
            <div class="content-container">
              <div class="content-block">
                <app-appearance-form></app-appearance-form>
              </div>
              <div class="content-block">
                
              </div>
            </div>
          </div>
          <div *ngSwitchCase="'Stats'">
          <div class="content-container">
              <div class="content-block">
                <app-stat-form></app-stat-form>
              </div>
              <div class="content-block">
                
                </div>
            </div>
          </div>
          <div *ngSwitchCase="'Items'">
            <app-items-shop></app-items-shop>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent {

  tabs: string[];
  activeTab: string;

  constructor () {
    this.tabs = ['Appearance', 'Stats', 'Items'];
    this.activeTab = this.tabs[0];
  }

  openTab(tab: string) {
    this.activeTab = tab;
  }
}
