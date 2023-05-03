import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';

import { appearanceForm, character, formEnum, race } from 'src/app/types/gameTypes';
import { GameState } from 'src/app/types/storeTypes';
import { generateCharacter } from 'src/app/utils/idex';
import { uniqValidator } from 'src/app/core/validators/uniq-validator';
import { ApiService } from 'src/app/core/services/api.service';
import { saveChar } from '../../store/actions';

/**
 * Character appearance form component.
 * Here ve display character name, race, weight, height inputs.
 */
@Component({
  selector: 'app-appearance-form',
  templateUrl: './appearance-form.component.html',
  styleUrls: ['./appearance-form.component.scss']
})
export class AppearanceFormComponent implements OnInit, OnDestroy {
  appearanceForm: FormGroup;
  races: race[];
  // We use selected race to set range selectors(height/weight) min/max values
  selectedRace: race;

  /**
   * For weight and height range selectors we use this values, that updated on fly.
   * When user chose value in range selector mirror it to form input, @see changeHandler
   */
  selectedHeight: number;
  selectedWeight: number;
  subscription: Subscription;

  constructor(
    private store: Store<{game: GameState}>,
    private apiService: ApiService,
    fb: FormBuilder
  ) {
 
    this.appearanceForm = fb.group({
      'raceId': [''],
      'height': [''],
      'weight': [''],
    }, { updateOn: 'change' });

    // We need to set name value on blur for not spam store.
    this.appearanceForm.addControl('name', new FormControl('', {
      validators: [ Validators.required, Validators.minLength(2), Validators.maxLength(16) ],
      asyncValidators: [uniqValidator.validate(this.apiService, 'name')],
      updateOn: 'blur'
    }));
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
    // Get races list from store
    this.store.select('game', 'gameData', 'races').pipe(
      take(1)
    ).subscribe((data: race[]) => this.races = data);

    // Set intial character data to form
    this.store.select('game', 'character').pipe(
      take(1)
    ).subscribe((characterData) => {
      this.setSelectedRace(characterData.raceId);
      this.setValues(characterData);
    });

    this.subscription = this.appearanceForm.valueChanges.subscribe((data) => this.processForm(data));
  }

  /**
   * Clear subscriptions
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Set values in form, and update height/weight range selectors values 
   */
  setValues(values: appearanceForm) {
    // Sync range selectors value
    this.selectedHeight = values.height;
    this.selectedWeight = values.weight;

    this.appearanceForm.setValue({
      // Name must be changed only by player input
      name: values.name || this.name.value,
      raceId: values.raceId,
      height: values.height,
      weight: values.weight,
    })
  }

  setSelectedRace(raceId: number) {
    this.selectedRace = this.races.find((race: race) => race.id === raceId) as race;
  }

  /**
   * Save form data to store every time when data changed
   */
  processForm(formData: appearanceForm) {
    const raceId = Number(this.raceId.value);
    const isRaceChanged = formData.raceId !== raceId;

    // If race was changed we should reset all character stats and appearance
    if (isRaceChanged) {
      this.setSelectedRace(raceId);
      const generatedCharacter = generateCharacter(this.selectedRace);

      // set generated values and skip save to store, because form change wil triggered one more time
      this.setValues(generatedCharacter);

      return;
    }

    this.store.dispatch(
      saveChar({data: formData as character, form: formEnum.appearance})
    );
  }

  /**
   * Here we set weight or height.
   * Mirror range selector value to according form value.
   */ 
  changeHandler($event: Event, field: string) {
    this.appearanceForm.get(field)?.setValue(Number(($event.target as HTMLInputElement).value));
  }
}
