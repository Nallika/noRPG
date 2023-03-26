import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { character, formEnum, race } from 'src/app/types/gameTypes';
import { charState, gameState } from 'src/app/types/storeTypes';
import { generateRandom } from 'src/app/utils/idex';
import { saveChar } from 'src/app/store/actions/charActions';
import { map } from 'rxjs';

@Component({
  selector: 'app-appearance-form',
  templateUrl: './appearance-form.component.html',
  styleUrls: ['./appearance-form.component.scss']
})
export class AppearanceFormComponent implements OnInit {

  appearanceForm: FormGroup;
  races: race[];
  selectedRace: race;

  constructor(
    private gameStore: Store<{game: gameState}>,
    private charStore: Store<{char: charState}>,
    fb: FormBuilder
  ) {
    
    this.appearanceForm = fb.group({
      'name': ['', [ Validators.required, Validators.maxLength(16) ]],
      'raceId': [''],
      'height': [''],
      'weight': [''],
    }, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.gameStore.select('game', 'gameData', 'races').subscribe((data: race[]) => this.races = data);

    // TODO: Add selected data caching
    const randomRace = generateRandom(0, this.races.length);
    this.selectedRace = this.races[randomRace];
    const selectedHeight = generateRandom(this.selectedRace.minHeight, this.selectedRace.maxHeight);
    const selectedWeight = generateRandom(this.selectedRace.minWeight, this.selectedRace.maxWeight);

    this.appearanceForm.get('raceId')?.setValue(this.selectedRace.id);
    this.appearanceForm.get('height')?.setValue(selectedHeight);
    this.appearanceForm.get('weight')?.setValue(selectedWeight);

    this.appearanceForm.valueChanges.subscribe((data) => this.charStore.dispatch(
      saveChar({
        data: {
          formData: data,
          formType: formEnum.appearance
        }})
    ));
  }

  // TODO: use this for set values
  initValues(raceId: number, height: number, weight: number) {
    this.appearanceForm.get('raceId')?.setValue(raceId);
    this.appearanceForm.get('height')?.setValue(height);
    this.appearanceForm.get('weight')?.setValue(weight);
  }

  get name(): FormControl {
    return this.appearanceForm.get('name') as FormControl;
  }



}
