import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatControllComponent } from './stat-controll.component';

describe('StatControllComponent', () => {
  let component: StatControllComponent;
  let fixture: ComponentFixture<StatControllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatControllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
