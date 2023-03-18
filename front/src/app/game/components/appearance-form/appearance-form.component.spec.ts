import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceFormComponent } from './appearance-form.component';

describe('AppearanceFormComponent', () => {
  let component: AppearanceFormComponent;
  let fixture: ComponentFixture<AppearanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppearanceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppearanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
