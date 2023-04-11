import { Injectable } from '@angular/core';
import { NewCharPageComponent } from 'src/app/game/pages/new-char-page/new-char-page.component';

/**
 * Confirmation guard to leave game page
 */
@Injectable()
export class LeaveGameGuard {

  canDeactivate(component: NewCharPageComponent) {
    return component.canExit();
  }
}
