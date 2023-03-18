import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsShopComponent } from './items-shop.component';

describe('ItemsShopComponent', () => {
  let component: ItemsShopComponent;
  let fixture: ComponentFixture<ItemsShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
