import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { CharService } from 'src/app/core/services/char.service';

@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.scss']
})
export class StatFormComponent {

  statForm: FormGroup;

  constructor(
    private charService: CharService,
    fb: FormBuilder
  ) {
    this.statForm = fb.group({
      'strength': [''],
      'agility': [''],
      'endurance': [''],
      'speed': [''],
    }, {updateOn: 'blur'});
  }

  ngDoCheck() {
    this.charService.saveCharacter(this.statForm.value);
  }

}
