import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../core/services/popup.service';

/**
 * Component to show popup above content.
 */
@Component({
  selector: 'app-popup',
  template: `
    <div class="overlay" [ngClass]="{'open': isOpen}">
      <div class="container">
        <div class="header">
          <div></div>
          <div class="title">{{title}}</div>
          <div class="close" (click)="onClose()">x</div>
        </div>
        <div class="content">{{content}}</div>
      </div>
    </div>
  `,
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  isOpen: boolean;
  title: string;
  content: string;

  constructor(private popupService: PopupService) {
    this.isOpen = false;
  }

  ngOnInit() {
    this.popupService.popup$.subscribe(popup => {
      this.isOpen = !!Object.keys(popup).length;
      this.title = popup.title;
      this.content = popup.content;
    });
  }

  onClose() {
    this.popupService.closePopup();
  }
}
