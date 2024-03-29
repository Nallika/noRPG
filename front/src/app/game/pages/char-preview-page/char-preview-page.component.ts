import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take, withLatestFrom } from 'rxjs';
import { resultCharacter } from 'src/app/types/gameTypes';
import { urlType } from 'src/app/types/generalTypes';
import { GameState } from 'src/app/types/storeTypes';

@Component({
  selector: 'app-char-preview-page',
  templateUrl: './char-preview-page.component.html',
  styleUrls: ['./char-preview-page.component.scss']
})
export class CharPreviewPageComponent implements OnInit {
  loading$: Observable<boolean>;
  title: string;
  score$: Observable<number>;
  characterData: resultCharacter;
  fieldsList: Array<keyof resultCharacter>;
  
  constructor (
    private router: Router,
    private store: Store<{game: GameState}>,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select('game', 'loading');

    this.loading$.pipe(
      withLatestFrom(this.store.select('game', 'resultCharacter')),
      take(2),
      map(([loading, resultCharacter]) => {
        const charStats = Object.keys(resultCharacter) as Array<keyof resultCharacter>;

        // If there are no char data, go to index page
        if (!loading && !charStats.length) {
          this.goTo('');

          return;
        }

        this.characterData = resultCharacter;
        this.fieldsList = charStats;
        this.title = `Behold: ${this.characterData.name}`;
      })
    ).subscribe();

    this.score$ =  this.store.select('game', 'score');
  }

  goTo(url: urlType) {
    this.router.navigateByUrl(`/${url}`);
  }
}
