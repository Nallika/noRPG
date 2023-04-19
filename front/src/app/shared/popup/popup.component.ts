import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PopupService } from '../../core/services/popup.service';
import { Observable } from 'rxjs';
import { popop } from 'src/app/types/generalTypes';

@Component({
  selector: 'app-popup',
  template: `
    <div class="overlay" [ngClass]="{'open': (popup$ | async)?.content}">
      <div class="container">
        <div class="header">
          <div></div>
          <div class="title">{{ (popup$ | async)?.title }}</div>
          <div class="close" (click)="onClose()">x</div>
        </div>
        <div class="content">{{ (popup$ | async)?.content }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit {
  popup$: Observable<popop>;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popup$ = this.popupService.popup$;
  }

  onClose() {
    this.popupService.closePopup();
  }
}
