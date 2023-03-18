import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { gameData } from 'src/app/types';

import { ApiService } from './api.service';

@Injectable()
export class GameLoaderService {
  private gameDataSubject = new BehaviorSubject<gameData>({} as gameData);
  public gameData = this.gameDataSubject.asObservable();

  constructor (
    private apiService: ApiService,
  ) { }

  loadGameData() {
    this.apiService.get('/gameData').subscribe({
      next: data => this.gameDataSubject.next(data),
      error: error => console.error('ERIR', error)
    });
  }
}