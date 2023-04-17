import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { characterMock, raceMock_1, raceMock_2 } from 'src/app/utils/mocks';
import { AppearanceFormComponent } from './appearance-form.component';
import { uniqValidator } from 'src/app/core/validators/uniq-validator';
import { By } from '@angular/platform-browser';
import { generateCharacter } from 'src/app/utils/idex';
import { saveChar } from 'src/app/store/actions/gameActions';
import { character, formEnum } from 'src/app/types/gameTypes';

describe('AppearanceFormComponent', () => {
  let component: AppearanceFormComponent;
  let store: MockStore;
  let fixture: ComponentFixture<AppearanceFormComponent>;
  const initialState = {
    game: {
      gameData: [raceMock_1, raceMock_2],
      character: characterMock,
    }
  };
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    spyOn(uniqValidator, 'validate').and.returnValue(() => of(null));

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ AppearanceFormComponent ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState }),
        {
          provide: ApiService,
          useValue: {}
        },
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(AppearanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change race and generate values', () => {
    const raceSelector: HTMLSelectElement = fixture.debugElement.query(By.css('[data-test="race-select"]')).nativeElement;

    raceSelector.value = '2'; 
    raceSelector.dispatchEvent(new Event('change'));
    const { raceId, height, weight } = generateCharacter(raceMock_2)

    expect(store.dispatch).toHaveBeenCalledWith(
      saveChar({
        data: {
          name: characterMock.name,
          raceId,
          height,
          weight
        } as character, 
        form: formEnum.appearance
      })
    );
  });

  it('should change weight', () => {
    const weighttSlider: HTMLInputElement = fixture.debugElement.query(By.css('[data-test="weight-slider"]')).nativeElement;
    const value = '175'
    weighttSlider.value = value;
    weighttSlider.dispatchEvent(new Event('change'));

    expect(store.dispatch).toHaveBeenCalledWith(
      saveChar({
        data: {
          name: characterMock.name,
          raceId: characterMock.raceId,
          height: characterMock.height,
          weight: Number(value),
        } as character, 
        form: formEnum.appearance
      })
    );
  });

  it('should change height', () => {
    const heightSlider: HTMLInputElement = fixture.debugElement.query(By.css('[data-test="height-slider"]')).nativeElement;
    const value = '175'
    heightSlider.value = value;
    heightSlider.dispatchEvent(new Event('change'));

    expect(store.dispatch).toHaveBeenCalledWith(
      saveChar({
        data: {
          name: characterMock.name,
          raceId: characterMock.raceId,
          weight: characterMock.weight,
          height: Number(value),
        } as character, 
        form: formEnum.appearance
      })
    );
  });
});
