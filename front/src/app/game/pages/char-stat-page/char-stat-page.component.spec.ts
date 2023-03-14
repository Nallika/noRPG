import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharStatPageComponent } from './char-stat-page.component';

describe('CharStatPageComponent', () => {
  let component: CharStatPageComponent;
  let fixture: ComponentFixture<CharStatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharStatPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharStatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
