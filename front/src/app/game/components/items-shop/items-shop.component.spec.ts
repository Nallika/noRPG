import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { character, formEnum } from 'src/app/types/gameTypes';
import { saveChar } from 'src/app/store/actions/gameActions';

import { ItemsShopComponent } from './items-shop.component';
import { armorMock, weaponMock } from 'src/app/utils/mocks';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ItemsShopComponent', () => {
  let component: ItemsShopComponent;
  let fixture: ComponentFixture<ItemsShopComponent>;
  let store: MockStore;
  const initialState = {
    game: {
      gameData: { armor: [armorMock], weapons: [weaponMock] },
    }
  };
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsShopComponent ],
      providers: [
        provideMockStore({ initialState }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(ItemsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call select weapon', () => {
    const weapon = fixture.debugElement.query(By.css('[data-test="weapon-item"]')).nativeElement;
    weapon.click();

    expect(store.dispatch).toHaveBeenCalledWith(
      saveChar({data: {weaponId: weaponMock.id} as character, form: formEnum.items})
    );
  });

  it('should call select armor', () => {
    const armorItem = fixture.debugElement.query(By.css('[data-test="armor-item"]')).nativeElement;
    armorItem.click();

    expect(store.dispatch).toHaveBeenCalledWith(
      saveChar({data: {armorId: armorMock.id} as character, form: formEnum.items})
    );
  });
});
