import { Injectable } from '@angular/core';

import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { character, player } from '../../types';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class CharService {
  private characterSubject = new BehaviorSubject<character>({} as character);
  public currentChar = this.characterSubject.asObservable();

  constructor (
    private apiService: ApiService,
  ) { }

  saveCharacter(charData: character): void {
    this.characterSubject.next(charData);
  }

  submitCharacter() {
    this.characterSubject.subscribe(charData => this.apiService.post('/newChar', charData));
  }
}
