import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CharPreviewPageComponent } from './char-preview-page.component';
import { resultCharacterMock } from 'src/app/utils/mocks';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CharPreviewPageComponent', () => {
  let component: CharPreviewPageComponent;
  let fixture: ComponentFixture<CharPreviewPageComponent>;
  let store: MockStore;

  const initialState = {
    game: {
      loading: false,
      resultCharacter: resultCharacterMock,
      score: 100,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharPreviewPageComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        provideMockStore({ initialState }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharPreviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render character data', () => {
    expect(fixture.debugElement.query(By.css('[data-test="title"]')).nativeElement.textContent).toContain(`Behold ${resultCharacterMock.name}`);

    const fields = fixture.debugElement.queryAll(By.css('[data-test="field"]'));
    expect(fields.length).toBe(Object.keys(resultCharacterMock).length);

    fields.forEach((field, index) => {
      const fieldValue = Object.values(resultCharacterMock)[index];
      expect(field.nativeElement.textContent).toContain(fieldValue);
    });
  });
});
