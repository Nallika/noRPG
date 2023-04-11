import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { popop } from 'src/app/types/generalTypes';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private popupSubject = new BehaviorSubject<popop>({} as popop);
  public popup$ = this.popupSubject.asObservable();

  public openPopup({title, content}: popop): void {
    this.popupSubject.next({title, content});
  }

  public closePopup(): void {
    this.popupSubject.next({} as popop);
  }
}
