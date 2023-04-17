import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { LadderPageComponent } from './ladder-page.component';
import { getLadder, resetLadder } from 'src/app/store/actions/gameActions';
import { getLadderMock } from '../utils/mocks';
import { By } from '@angular/platform-browser';



describe('LadderPageComponent', () => {
  let component: LadderPageComponent;
  let fixture: ComponentFixture<LadderPageComponent>;
  let store: MockStore;
  const initialState = {
    game: {
      loading: false,
      ladderData: {
        ladderChunk: [],
        isFull: false
      }
    }
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LadderPageComponent],
        providers: [provideMockStore({ initialState })],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LadderPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader', () => {
    spyOn(store, 'select').and.returnValues(
      of(true),
      of(false),
      of([])
    );

    fixture.detectChanges();

    const loader = fixture.debugElement.queryAll(By.css('[data-test="loader"]'));
    expect(loader.length).toBe(1);
  });

  it('should load 20 elements initially', () => {
    spyOn(store, 'select').and.returnValues(
      of(false),
      of(false),
      of(getLadderMock('First'))
    );

    fixture.detectChanges();

    expect(component.ladder.length).toEqual(20);
  });

  it('should dispatch getLadder when ngOnInit is called', () => {
    spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(getLadder());
  });

  it('should dispatch resetLadder when ngOnDestroy is called', () => {
    spyOn(store, 'dispatch');

    component.ngOnDestroy();

    expect(store.dispatch).toHaveBeenCalledWith(resetLadder());
  });
});
