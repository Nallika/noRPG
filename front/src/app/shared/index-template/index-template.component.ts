import { Component } from '@angular/core';

@Component({
  selector: 'app-index-template',
  template: `
    <div class="container">
      <div class="logo-wrap">
        <app-logo [large]="true"></app-logo>
      </div>
      <div class="content-wrap">
        <ng-content select="content"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./index-template.component.scss']
})
export class IndexTemplateComponent {

}
