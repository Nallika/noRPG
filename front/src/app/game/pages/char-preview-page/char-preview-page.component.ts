import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { fullCharacter } from 'src/app/types/gameTypes';
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
  score: number;
  characterData: fullCharacter;
  fieldsList: Array<keyof fullCharacter>;
  
  constructor (
    private router: Router,
    private store: Store<{game: gameState}>,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select('game', 'loading');
    this.error$ = this.store.select('game', 'error');

    // Get result character
    this.store.select('game', 'resultCharacter').subscribe((data) => {
      this.characterData = data;
      this.fieldsList = Object.keys(data) as Array<keyof fullCharacter>;
      this.title = `Behold ${this.characterData.name}`;
    });

    this.store.select('game', 'score').subscribe((data) => {
      this.score = data;
    });

  }

  goTo(url: urlType) {
    this.router.navigateByUrl(`/${url}`);
  }
}
