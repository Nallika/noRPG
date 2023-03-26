import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';

import { saveChar } from 'src/app/store/actions/gameActions';
import { formEnum, race } from 'src/app/types/gameTypes';
import { gameState } from 'src/app/types/storeTypes';

@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.scss']
})
export class StatFormComponent implements OnInit {

  statForm: FormGroup;
  selectedRace: race; 

  constructor(
    private store: Store<{game: gameState}>,
    fb: FormBuilder
  ) {
    this.statForm = fb.group({
      'strength': [''],
      'agility': [''],
      'endurance': [''],
      'speed': [''],
    }, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.store.select('game', 'charData', 'character', 'raceId')
      .pipe(
        mergeMap((raceId) => {
          return this.store.select('game', 'gameData', 'data', 'races').pipe(
            map((races) => races.find((race: race) => race.id === raceId))
          )
        })
      ).subscribe(race => this.selectedRace = race)

    this.strength.setValue(this.selectedRace?.initialStrength);
    this.agility.setValue(this.selectedRace?.initialAgility);
    this.endurance.setValue(this.selectedRace?.initialEndurance);
    this.speed.setValue(this.selectedRace?.initialspeed);

    this.statForm.valueChanges.subscribe((data) => this.store.dispatch(
      saveChar({
        data: {
          formData: data,
          formType: formEnum.stats
        }})
    ));
  }

  get strength(): FormControl {
    return this.statForm.get('strength') as FormControl;
  }

  get agility(): FormControl {
    return this.statForm.get('agility') as FormControl;
  }

  get endurance(): FormControl {
    return this.statForm.get('endurance') as FormControl;
  }

  get speed(): FormControl {
    return this.statForm.get('speed') as FormControl;
  }

  changeHandler(value: number, stat: string) {
    this.statForm.get(stat)?.setValue(value);
  }
}
