import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlackInputComponent } from './black-input.component';

describe('BlackInputComponent', () => {
  let component: BlackInputComponent;
  let fixture: ComponentFixture<BlackInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackInputComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value', () => {
    const newValue = 'new value';
    component.writeValue(newValue);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual(newValue);
  });
});
