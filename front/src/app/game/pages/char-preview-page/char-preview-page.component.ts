import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take, withLatestFrom } from 'rxjs';
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

    this.loading$.pipe(
      withLatestFrom(this.store.select('game', 'resultCharacter')),
      take(2),
      map(([loading, resultCharacter]) => {
        const charStats = Object.keys(resultCharacter) as Array<keyof fullCharacter>;

        // If there are no char data, go to index page
        if (!loading && !charStats.length) {
          this.goTo('');

          return;
        }

        this.characterData = resultCharacter;
        this.fieldsList = charStats;
        this.title = `Behold ${this.characterData.name}`;
      })
    ).subscribe();

    this.store.select('game', 'score').subscribe((data) => {
      this.score = data;
    });

  }

  goTo(url: urlType) {
    this.router.navigateByUrl(`/${url}`);
  }
}
