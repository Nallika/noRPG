import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, take } from 'rxjs';

import { saveChar } from 'src/app/store/actions/gameActions';
import { formEnum, statsForm } from 'src/app/types/gameTypes';
import { gameState } from 'src/app/types/storeTypes';

/**
 * Character stats form component.
 * Stats form have 4 stat: strength, agility, stamina, speed.
 * Character can increase stats values with free stat poins. 20 points to use.
 */
@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.scss']
})
export class StatFormComponent implements OnInit, OnDestroy {
  statForm: FormGroup;
  freeStatPoints$: Observable<number>;
  subscription: Subscription;

  constructor(
    private store: Store<{game: gameState}>,
    fb: FormBuilder
  ) {
    this.statForm = fb.group({
      'strength': [''],
      'agility': [''],
      'stamina': [''],
      'speed': [''],
    });
  }

  get strength(): FormControl {
    return this.statForm.get('strength') as FormControl;
  }

  get agility(): FormControl {
    return this.statForm.get('agility') as FormControl;
  }

  get stamina(): FormControl {
    return this.statForm.get('stamina') as FormControl;
  }

  get speed(): FormControl {
    return this.statForm.get('speed') as FormControl;
  }

  ngOnInit(): void {
    this.freeStatPoints$ = this.store.select('game', 'freeStatPoints');

    // Set inital stat data on cpomponent load
    this.store.select('game', 'character').pipe(
      take(1)
    ).subscribe((characterData) => {
      this.setValues(characterData);
    });

    // Save form on change stat values
    this.subscription = this.statForm.valueChanges.subscribe((data) => this.store.dispatch(
      saveChar({data, form: formEnum.stats})
    ));
  }

  /**
   * Clear subscriptions
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Set values in form
   */
  setValues(values: statsForm) {
    this.statForm.setValue({
      strength: values.strength,
      agility: values.agility,
      stamina: values.stamina,
      speed: values.speed,
    });
  }

  /**
   * Change stat values, receive stat value from StatControllComponent
   */ 
  changeHandler(value: number, stat: string) {
    this.statForm.get(stat)?.setValue(value);
  }

  /**
   * We can only increase stats if there are free points for it.
   * If freeStatPoints reached 0, we should disable incrising stat poins.
   * Transfered as prop to StatControllComponent
   */
  isIncreaseDisabled(): Observable<boolean> {
    return this.freeStatPoints$.pipe(map((val) => val === 0));
  }
}
