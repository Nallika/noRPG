import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StatControllComponent } from './stat-controll.component';

describe('StatControllComponent', () => {
  let component: StatControllComponent;
  let fixture: ComponentFixture<StatControllComponent>;
  let changeValueEventSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatControllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatControllComponent);
    component = fixture.componentInstance;
    changeValueEventSpy = spyOn(component.changeValueEvent, 'emit').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase stat', () => {
    let value = 10;
    component.value = value;
    const button = fixture.debugElement.query(By.css('[data-test="increase"]')).nativeElement;
    button.click();

    expect(changeValueEventSpy).toHaveBeenCalledWith(++value);
  });

  it('should descrease stat', () => {
    let value = 10;
    component.value = value;
    const button = fixture.debugElement.query(By.css('[data-test="descrease"]')).nativeElement;
    button.click();

    expect(changeValueEventSpy).toHaveBeenCalledWith(--value);
  });

  it('shouldn\'t increase stat when increaseDisabled = true', () => {
    const value = 10;
    component.increaseDisabled = true;
    component.value = value;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('[data-test="increase"]')).nativeElement;
    button.click();

    expect(component.value).toBe(value);
    expect(changeValueEventSpy).not.toHaveBeenCalled();
  });
});
