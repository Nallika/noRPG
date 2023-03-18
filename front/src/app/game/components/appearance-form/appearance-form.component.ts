import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CharService } from 'src/app/core/services/char.service';
import { GameLoaderService } from 'src/app/core/services/game-loader.service';
import { race, gameData } from 'src/app/types';

@Component({
  selector: 'app-appearance-form',
  templateUrl: './appearance-form.component.html',
  styleUrls: ['./appearance-form.component.scss']
})
export class AppearanceFormComponent implements OnInit {

  appearanceForm: FormGroup;
  races: race[];

  constructor(
    private charService: CharService,
    private gameService: GameLoaderService,
    fb: FormBuilder
  ) {
    this.appearanceForm = fb.group({
      'name': ['', [ Validators.required, Validators.maxLength(16) ]],
      'race': [''],
      'height': [''],
      'weight': [''],
    }, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.gameService.gameData.subscribe(({races}: gameData) => this.races = races);
  }

  get name(): FormControl {
    return this.appearanceForm.get('name') as FormControl;
  }

  ngDoCheck() {
    this.charService.saveCharacter(this.appearanceForm.value);
  }

}
