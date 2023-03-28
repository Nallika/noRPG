import { Component } from '@angular/core';

/**
 * Template for game pages
 * TODO: check is it needed
 */
@Component({
  selector: 'app-game-template',
  template: `
    <div class="container">
      <div class="border">
        <div class="wrap">
            <div class="header">
              <ng-content select="header"></ng-content>
            </div>
            <div class="content">
              <ng-content select="content"></ng-content>
            </div>
            <div class="footer">
              <div class="footer-wrap">
                <div>
                  <ng-content select=".left-button"></ng-content>
                </div>
                <div>
                  <ng-content select=".right-button"></ng-content>
                </div>  
              </div> 
            </div>
          </div>
      </div>
  </div>
  `,
  styleUrls: ['./game-template.component.scss']
})
export class GameTemplateComponent {
  
}
