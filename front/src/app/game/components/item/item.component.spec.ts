import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { armor } from 'src/app/types/gameTypes';
import { armorMock } from 'src/app/utils/mocks';

describe('ItemComponent', () => {
  let component: ItemComponent<armor>;
  let fixture: ComponentFixture<ItemComponent<armor>>;
  let selectItemSpy: jasmine.Spy;
  const type = 'armor';
  const selectedItemId$: Observable<number> = of(1);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent<armor>);
    component = fixture.componentInstance;
    component.itemData = armorMock;
    component.type = type;
    component.selectedItemId$ = selectedItemId$;
    selectItemSpy = spyOn(component.selectItem, 'emit').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit select item event', () => {
    const button = fixture.debugElement.query(By.css('[data-test="button"')).nativeElement;
    button.click();

    expect(selectItemSpy).toHaveBeenCalledWith({
      itemId: armorMock.id,
      type: type
    });
  });

  it('should display item info', () => {
    const itemInfo = fixture.debugElement.query(By.css('[data-test="info"')).nativeElement;
    const expectedInfo = `Armor: ${armorMock.armorValue}`;

    expect(itemInfo.textContent).toContain(expectedInfo);
  });
});
