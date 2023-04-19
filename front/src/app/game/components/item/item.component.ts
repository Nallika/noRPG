import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { armor, itemType, itemEnum, weapon } from 'src/app/types/gameTypes';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * Conponent displayed block of weapon or armor.
 */
export class ItemComponent<T extends armor | weapon> {
  @Input() itemData: T;
  @Input() type: itemType;
  @Input() selectedItemId$: Observable<number>;
  @Output() selectItem = new EventEmitter<{ itemId: number, type: itemType}>();
  
  /**
   * Get armor value or wepon damage
   */
  getItemInfo(): string {
    if (this.type === itemEnum.weapon) {
      const { minDamage, maxDamage } = this.itemData as weapon;
      return `Dmg: ${minDamage}-${maxDamage}`
    } else {
      const { armorValue } = this.itemData as armor;
      return `Armor: ${armorValue}`
    }
  }

  setIsSelected() {
    this.selectItem.emit({
      itemId: this.itemData.id,
      type: this.type
    });
  }
}
