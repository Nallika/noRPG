import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { urlType } from 'src/app/types/generalTypes';
import { gameState } from 'src/app/types/storeTypes';

@Component({
  selector: 'app-char-preview-page',
  templateUrl: './char-preview-page.component.html',
  styleUrls: ['./char-preview-page.component.scss']
})
export class CharPreviewPageComponent {
  loading$: Observable<boolean>;
  error$: Observable<string>;
  title: string;
  
  constructor (
    private router: Router,
    private store: Store<{game: gameState}>,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select('game', 'loading');
    this.error$ = this.store.select('game', 'error');

    //TODO add character full info
  }

  goTo(url: urlType) {
    this.router.navigateByUrl(`/${url}`);
  }
}
