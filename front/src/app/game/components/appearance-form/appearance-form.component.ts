import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { appearanceForm, character, race } from 'src/app/types/gameTypes';
import { gameState } from 'src/app/types/storeTypes';
import { generateCharValues } from 'src/app/utils/idex';
import { saveChar } from 'src/app/store/actions/gameActions';

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
    private store: Store<{game: gameState}>,
    fb: FormBuilder
  ) {
    
    this.appearanceForm = fb.group({
      'name': ['', [ Validators.required, Validators.maxLength(16) ]],
      'raceId': [''],
      'height': [''],
      'weight': [''],
    }, {updateOn: 'blur'});
  }

  get name(): FormControl {
    return this.appearanceForm.get('name') as FormControl;
  }

  get raceId(): FormControl {
    return this.appearanceForm.get('raceId') as FormControl;
  }

  get height(): FormControl {
    return this.appearanceForm.get('height') as FormControl;
  }

  get weight(): FormControl {
    return this.appearanceForm.get('weight') as FormControl;
  }

  ngOnInit(): void {
    this.store.select('game', 'gameData', 'data', 'races').pipe(
      take(1)
    ).subscribe((data: race[]) => this.races = data);

    this.store.select('game', 'charData', 'character').pipe(
      take(1)
    ).subscribe((characterData) => {
      this.selectedRace = this.races[characterData.raceId];
      this.setValues(characterData);
    });

    this.appearanceForm.valueChanges.subscribe((data) => this.processForm(data));
  }

  /**
   * Set values in form
   */
  setValues(formValues: appearanceForm) {
    this.raceId?.setValue(formValues.raceId);
    this.height.setValue(formValues.height);
    this.weight.setValue(formValues.weight);
  }

  /**
   * Save form data to store every time when data changed
   */
  processForm(formData: appearanceForm) {
    let charData = formData;

    const raceId = Number(this.raceId.value);
    const isRaceChanged = charData.raceId !== raceId;

    // If race was changed we should reset all character stats and appearance
    if (isRaceChanged) {
      this.selectedRace = this.races.find((race: race) => race.id === raceId) as race;
      charData = generateCharValues(this.selectedRace);
      this.setValues(charData);
    }

    this.store.dispatch(
      saveChar({data: charData as character})
    );
  }
}
