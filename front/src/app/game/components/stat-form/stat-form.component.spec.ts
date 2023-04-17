import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { saveChar } from 'src/app/store/actions/gameActions';
import { StatFormComponent } from './stat-form.component';
import { character, formEnum } from 'src/app/types/gameTypes';
import { characterMock } from 'src/app/utils/mocks';
import { StatControllComponent } from '../stat-controll/stat-controll.component';

describe('StatFormComponent', () => {
  let component: StatFormComponent;
  let fixture: ComponentFixture<StatFormComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const initialState = {
    game: {
      freeStatPoints: 20,
      character: characterMock,
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ StatFormComponent, StatControllComponent ],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update store when the form changes', () => {
    const value = 5;
    component.strength.setValue(value);
    const { agility, stamina, speed } = characterMock;

    expect(store.dispatch).toHaveBeenCalledWith(
      saveChar({
        data: { strength: 5, agility, stamina, speed } as character,
        form: formEnum.stats
      })
    );
  });
});
