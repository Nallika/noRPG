import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { saveChar } from 'src/app/store/actions/gameActions';
import { formEnum, race, statsForm } from 'src/app/types/gameTypes';
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

  ngOnInit(): void {
    this.store.select('game', 'charData', 'character').pipe(
      take(1)
    ).subscribe((characterData) => {
      this.setValues(characterData);
    });

    this.statForm.valueChanges.subscribe((data) => this.store.dispatch(
      saveChar({data})
    ));
  }

  /**
   * Set values in form
   */
  setValues(formValues: statsForm) {
    this.strength.setValue(formValues.strength);
    this.agility.setValue(formValues.agility);
    this.endurance.setValue(formValues.endurance);
    this.speed.setValue(formValues.speed);
  }

  /**
   * Change stat values 
   */ 
  changeHandler(value: number, stat: string) {
    this.statForm.get(stat)?.setValue(value);
  }
}
