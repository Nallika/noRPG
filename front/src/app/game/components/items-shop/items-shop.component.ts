import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, take } from 'rxjs';

import { armor, character, formEnum, itemEnum, itemType, weapon } from 'src/app/types/gameTypes';
import { GameState } from 'src/app/types/storeTypes';

import { saveChar } from '../../store/actions';

/**
 * Conponent displayed list of itemes (armor and weapons).
 * Player can choose one armor and one weapon.
 */
@Component({
  selector: 'app-items-shop',
  templateUrl: './items-shop.component.html',
  styleUrls: ['./items-shop.component.scss']
})
export class ItemsShopComponent implements OnInit {
  armor: armor[];
  weapons: weapon[];

  armorDescription: string | undefined;
  weaponDescription: string | undefined;

  public selectedArmorSubject = new BehaviorSubject<number>(1);
  public selectedWeaponSubject = new BehaviorSubject<number>(1);

  constructor(
    private store: Store<{game: GameState}>,
  ) {}

  ngOnInit(): void {
    this.store.select('game', 'gameData').pipe(
      take(1)
    ).subscribe(({armor, weapons}) => {
      this.armor = armor;
      this.weapons = weapons;
    });

    // Set selected armor to store, and show selected armor description
    this.selectedArmorSubject.subscribe(armorId => {
      this.armorDescription = this.armor.find((armor) => armorId === armor.id)?.description;
      this.store.dispatch(saveChar({data: {armorId} as character, form: formEnum.items}));
    });

    // Set selected weapon to store, and show selected weapon description
    this.selectedWeaponSubject.subscribe(weaponId => {
      this.weaponDescription = this.weapons.find((weapon) => weaponId === weapon.id)?.description;
      this.store.dispatch(saveChar({data: {weaponId} as character, form: formEnum.items}));
    });
  }

  // Select item by type
  selectItemHandler({itemId, type}: {itemId: number, type: itemType}) {
    if (type === itemEnum.armor) {
      this.selectedArmorSubject.next(itemId);
    } else {
      this.selectedWeaponSubject.next(itemId);
    }
  }

}
