import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take, withLatestFrom } from 'rxjs';
import { resultCharacter } from 'src/app/types/gameTypes';
import { urlType } from 'src/app/types/generalTypes';
import { gameState } from 'src/app/types/storeTypes';

@Component({
  selector: 'app-char-preview-page',
  template: `
<ng-container *ngIf="loading$ | async; else elseBlock">
  <app-loader></app-loader>
</ng-container>
<ng-template #elseBlock>
  <app-game-template>
    <header>
      <p data-test="title" class="title">{{title}}</p>
    </header>
    <content>
      <div class="container">
        <div class="char-info">
          <div class="block">
            <div class="stat-block">
              <div class="stat-group">
                <app-result-stat [title]="'Name'" [value]="characterData.name"></app-result-stat>
                <app-result-stat [title]="'Race'" [value]="characterData.race"></app-result-stat>
              </div>
              <div class="stat-group">
                <app-result-stat [title]="'Height'" [value]="characterData.height"></app-result-stat>
                <app-result-stat [title]="'Weight'" [value]="characterData.weight"></app-result-stat>
                <app-result-stat [title]="'Health'" [value]="characterData.health"></app-result-stat>
              </div>
              <div class="stat-group">
                <app-result-stat [title]="'Strength'" [value]="characterData.strength"></app-result-stat>
                <app-result-stat [title]="'Agility'" [value]="characterData.agility"></app-result-stat>
                <app-result-stat [title]="'Stamina'" [value]="characterData.stamina"></app-result-stat>
                <app-result-stat [title]="'Speed'" [value]="characterData.speed"></app-result-stat>
              </div>
              <div class="stat-group">
                <app-result-stat [title]="'Weapon'" [value]="characterData.weapon"></app-result-stat>
                <app-result-stat [title]="'Hit chanse'" [value]="characterData.hitChanse | addPercents"></app-result-stat>
                <app-result-stat [title]="'Damage'" [value]="characterData.damage"></app-result-stat>
                <app-result-stat [title]="'Initiative'" [value]="characterData.initiative"></app-result-stat>
              </div>
              <div class="stat-group">
                <app-result-stat [title]="'Armor'" [value]="characterData.armor"></app-result-stat>
                <app-result-stat [title]="'Mitigation'" [value]="characterData.mitigation"></app-result-stat>
                <app-result-stat [title]="'Dodge chanse'" [value]="characterData.dodgeChanse | addPercents"></app-result-stat>
              </div>
            </div>
            <div class="score-info">
              <app-result-stat [title]="'Your score:'" [value]="score$ | async"></app-result-stat>
            </div>
          </div>
          <div class="block">
            <img class="image"/>
          </div>
        </div>
      </div>
    </content>
    <app-button [title]="'main page'" (click)="goTo('')" class="left-button"></app-button>
    <app-button [title]="'ladder'" (click)="goTo('ladder')" class="right-button"></app-button>
  </app-game-template>
</ng-template>
  `,
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
    private store: Store<{game: gameState}>,
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
