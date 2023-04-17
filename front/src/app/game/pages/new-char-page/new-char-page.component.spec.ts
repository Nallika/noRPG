import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NewCharPageComponent } from './new-char-page.component';
import { PopupService } from 'src/app/core/services/popup.service';
import { getGameData, generateChar, submitChar } from 'src/app/store/actions/gameActions';


describe('NewCharPageComponent', () => {
  let component: NewCharPageComponent;
  let fixture: ComponentFixture<NewCharPageComponent>;
  let store: MockStore;
  let popupService: jasmine.SpyObj<PopupService>;

  const initialState = {
    game: {
      loading: false,
      error: null,
      resultCharacter: null,
      score: 0,
    },
  };

  beforeEach(async () => {
    popupService = jasmine.createSpyObj('PopupService', ['openPopup']);

    await TestBed.configureTestingModule({
      declarations: [NewCharPageComponent],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: PopupService, useValue: popupService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NewCharPageComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getGameData on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(getGameData());
  });

  it('should dispatch generateChar on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(generateChar());
  });

  it('should call showHelp on click', () => {
    const button = fixture.debugElement.query(By.css('[data-test="help"]')).nativeElement;
    button.click();

    expect(popupService.openPopup).toHaveBeenCalled();
  });

  it('should call submitChar on submitHandler', () => {
    const button = fixture.debugElement.query(By.css('[data-test="finish"]')).nativeElement;
    button.click();

    expect(store.dispatch).toHaveBeenCalledWith(submitChar());
  });
});

